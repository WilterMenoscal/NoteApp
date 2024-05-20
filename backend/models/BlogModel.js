import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";

const NoteModel = db.define('notes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    active: {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: 'yes'
    }
});

export default NoteModel;