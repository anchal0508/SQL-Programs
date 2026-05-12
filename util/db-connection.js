const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myFirstDb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been Created...");
    } catch (error) {
        console.log(error);
    }
})();
module.exports = sequelize;