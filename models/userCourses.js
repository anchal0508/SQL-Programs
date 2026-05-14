const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const userCourses = sequelize.define('userCourses', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    }
}); // automatically created

module.exports = userCourses;