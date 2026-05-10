const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '1234',
    database: "myFirstDb",
});

const connectionQuery1 = `CREATE TABLE USERS (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), email VARCHAR(30));`
const connectionQuery2 = `CREATE TABLE BUSES (id INT AUTO_INCREMENT PRIMARY KEY, busNumber VARCHAR(20), totalSeats INT, availableSeats INT);`
const connectionQuery3 = `CREATE TABLE BOOKINGS(id INT AUTO_INCREMENT PRIMARY KEY, seatNumber INT);`
const connectionQuery4 = `CREATE TABLE PAYMENTS(id INT AUTO_INCREMENT PRIMARY KEY, amountPaid INT, paymentStatut VARCHAR(10));`

connection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("DataBase Connected Successfully");

    connection.execute(connectionQuery1, (err)=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }
        console.log("User Table has been Created Successfully!");
    });

    connection.execute(connectionQuery2, (err)=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }
        console.log("BUSES Table has been Created Successfully!");
    });


    connection.execute(connectionQuery3, (err)=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }
        console.log("BOOKINGS Table has been Created Successfully!");
    });


    connection.execute(connectionQuery4, (err)=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }
        console.log("PAYMENTS Table has been Created Successfully!");
    });
})


app.get('/', (req, res)=>{
    res.send('<h1>Check tables now...</h1>');
})



app.listen(3000, ()=>console.log("online..."));