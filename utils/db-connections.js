
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '1234',
    database: "myFirstDb",
});

const connectionQuery1 = `CREATE TABLE IF NOT EXISTS STUDENTS (
id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), email VARCHAR(30));`

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("DataBase Connected Successfully");

    connection.execute(connectionQuery1, (err) => {
        if (err) {
            console.log(err);
            connection.end();
            return;
        }
        console.log("User Table has been Created Successfully!");
    });


})


module.exports = connection;