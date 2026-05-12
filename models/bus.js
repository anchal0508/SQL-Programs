const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const bus = sequelize.define('Buses', {
    busId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    busName: { type: DataTypes.STRING, allowNull: false },
    totalSeats: { type: DataTypes.INTEGER, allowNull: false },
    availableSeats: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = bus;