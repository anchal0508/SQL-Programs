const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');


const User = sequelize.define('users', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },

    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },

    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    location: {
        allowNull: false,
        type: DataTypes.STRING
    },
});


module.exports = User;