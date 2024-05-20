import { Sequelize } from 'sequelize';

const db = new Sequelize('work', 'work',"1234", {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

export default db;
