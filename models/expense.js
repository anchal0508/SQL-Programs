const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connection');


const Expense = sequelize.define('expense', {
    expid: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    amount: {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Expense;