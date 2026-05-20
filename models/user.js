const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connection');


const User = sequelize.define('user', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type : DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        unique: true,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = User;