// models/ForgotPasswordRequest.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection'); // Your database configuration

const ForgotPasswordRequest = sequelize.define('ForgotPasswordRequest', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});
 

module.exports = ForgotPasswordRequest;
