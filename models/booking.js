const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connection');



const Booking = sequelize.define('Booking', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    seatNumber: {
        type : DataTypes.INTEGER,
        allowNull: false
    }

});

module.exports = Booking;