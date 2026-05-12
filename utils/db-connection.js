const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('myFirstDb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database Has been created");

    } catch (error) {
        console.log(error);
    }
})();

module.exports = sequelize;







// const mysql = require('mysql2');

// const connection= mysql.createConnection({
//     host: 'localhost',
//     user: "root",
//     password: '1234',
//     database: 'myFirstDb'
// });

// const connectionQuery = `CREATE TABLE IF NOT EXISTS STUDENTS (ID INT AUTO_INCREMENT PRIMARY KEY,
// NAME VARCHAR(20) NOT NULL, EMAIL VARCHAR(50) UNIQUE NOT NULL, AGE INT NOT NULL)`;

// connection.connect((err)=>{
//     if(err){
//         console.log(err.message);
//     }
//     console.log('Database Connected...');

//     connection.execute(connectionQuery, (err)=>{
//         if(err){
//             console.log(err.message);
//         }
//         console.log("Connection has been stablished Successfully...!");
//     })

// })



// module.exports = connection;