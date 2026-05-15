const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connection');



const Expense = sequelize.define('expense', {
    id: {
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    expenseOn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Expense;