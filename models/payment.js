const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER
    },
    paymentSessionId: {
        type: DataTypes.INTEGER
    },
    orderAmount: {
        type: DataTypes.INTEGER
    },
    orderCurrency: {
        type: DataTypes.INTEGER
    },
    paymentStatus: {
        type: DataTypes.STRING
    },
})


module.exports = Payment;