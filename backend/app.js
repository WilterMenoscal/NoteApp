import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt'; 
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import UserModel from './models/UserModel.js';
import { Sequelize } from 'sequelize';
import NoteRoutes from './routes/routes.js'
import CateRoutes from './routes/routesCat.js'
const salt = 10;
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  
app.use(cookieParser())

const sequelize = new Sequelize('work', 'work',"1234", {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true }); 
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

db();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ Error: "Token not provided" });
    }

    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.status(401).json({ Error: "Invalid token" });
        }
        req.username = decoded.name;
        next();
    });
};

const verifyUser = (req, res, next) => {
    const token=req.cookies.token;
    if (!token) {
        return res.json({Error:"You are not authenticated"})
    } else {
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if (err) {
                return res.json({Error:"Token is not okay"})                
            } else {
                req.name=decoded.name; 
                next();
            }
        })
    }
}

app.use('/notes', verifyToken,NoteRoutes); // Apply verify Token
app.use('/category', verifyToken,CateRoutes);




app.get('/',verifyUser, async (req, res) => {
    try {
        const user = await UserModel.findOne({ where: { username: req.name } });
        if (!user) {
            return res.json({ Error: "User not found" });
        }
        return res.json({ Status: "Success", name: req.name });
    } catch (error) {
        return res.json({ Error: error.message });
    }
});

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password.toString(), salt);
        const newUser = await UserModel.create({
            username: req.body.username,
            password: hashedPassword
        });
        res.json({ Status: "Success" });
    } catch (error) {
        res.json({ Error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.json({ Error: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(req.body.password.toString(), user.password);
        if (passwordMatch) {
            const token = jwt.sign({ id: user.id, name: user.username }, "jwt-secret-key", { expiresIn: '1d' });
            res.cookie("token", token);
            res.json({ Status: "Success", userId: user.id  });
        } else {
            res.json({ Error: "Password not matched" });
        }
    } catch (error) {
        res.json({ Error: error.message });
    }
});
app.post("/logout", async(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})

app.listen(8000, () => {
    console.log('Server up running in http://localhost:8000/');
});
