const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');


const IdentityCard = sequelize.define('identityCard', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cardNo: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false
    },
    
});


module.exports = IdentityCard;