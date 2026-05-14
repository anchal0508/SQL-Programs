const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('myFirstDb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully!');
    } catch (error) {
        console.log(error.message);
    }
})();

module.exports = sequelize;