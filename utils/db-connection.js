const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('myFirstDb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});


(async () => {
    try {
        sequelize.authenticate();
        console.log('DB Connected...');

    } catch (error) {
        console.log('DB not Connected...' + error.message);
    }

})();


module.exports = sequelize;