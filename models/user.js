const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connection');


const User = sequelize.define('userData', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    pass:{
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = User;