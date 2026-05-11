const express = require('express');
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: "localhost",
    database: "myFirstDb",
    user: "root",
    password: "1234"
});


connection.connect((err) => {
    if (err) {
        console.log("DB connection Error: " + err.message);
    }
    console.log('Connection Established successfully!');


    // User table creation...
    const userTable = `CREATE TABLE IF NOT EXISTS USERS (  
    ID INT AUTO_INCREMENT PRIMARY KEY, 
    NAME VARCHAR(20) NOT NULL, 
    PHONE INT(15) NOT NULL       )`

    connection.execute(userTable, (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log('Online Bus Service is Connected with USERs Successfully!');
    })


    // Busses table creation
    const busTable = `CREATE TABLE IF NOT EXISTS BUSES  (
    BUS_ID INT AUTO_INCREMENT PRIMARY KEY, 
    BUS_NAME VARCHAR(20) NOT NULL,
    TOTAL_SEATS INT NOT NULL,
    AVAILABLE_SEATS INT NOT NULL    )`

    connection.execute(busTable, (err) => {
        if (err) {
            console.log("DB connection Error: " + err.message);
        }
        console.log('Busses Table Created Successfully!')
    })

})



module.exports = connection;