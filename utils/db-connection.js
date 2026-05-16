const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('myFirstDb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {

    try {
        sequelize.authenticate();
        console.log('DataBase is Connected Successfully...!');
    } catch (error) {
        console.log("Error connecting DataBase: " + error.message);
    }

})();



module.exports = sequelize;
