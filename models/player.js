const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');


const Player = sequelize.define('player', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true,
         
    },
    bPlace: {
        type: DataTypes.STRING
    },
    career: {
        type: DataTypes.TEXT
    },
    matches: {
        type: DataTypes.INTEGER
    },
    score: {
        type: DataTypes.INTEGER
    },
    fifty: {
        type: DataTypes.INTEGER
    },
    century: {
        type: DataTypes.INTEGER
    },
    wicket: {
        type: DataTypes.INTEGER
    },
    average: {
        type: DataTypes.INTEGER
    },


});


module.exports = Player;