import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CategoryModel = db.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NameC: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default CategoryModel;