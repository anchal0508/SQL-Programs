const {Sequelize} = require('sequelize');
const sequelize = require('../util/db-connection');


const User = sequelize.define( 'User', {
    id: {
        autoIncrement : true,
        primaryKey : true,
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});


module.exports = User;