import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const UserModel = db.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default UserModel;
