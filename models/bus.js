const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');



const Bus = sequelize.define('Bus', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    busNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

});

module.exports = Bus;