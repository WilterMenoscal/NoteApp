import db from "../database/db.js";
import { DataTypes } from "sequelize";
import CategoryModel from "./CreateCategory.js";
import NoteModel from "./BlogModel.js";


const NoteCategoryModel = db.define('notecategories', {
    id_cat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CategoryModel,
            key: 'id'
        }
    },
    id_note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: NoteModel,
            key: 'id'
        }
    }
});

NoteCategoryModel.belongsTo(CategoryModel, { foreignKey: 'id_cat' });
NoteCategoryModel.belongsTo(NoteModel, { foreignKey: 'id_note' });

export default NoteCategoryModel;
