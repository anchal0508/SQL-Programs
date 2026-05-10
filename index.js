const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '1234',
    database: 'myFirstDb'
})

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('connection has been created');
    const creationQuery = `CREATE TABLE STUDENTS(
        ID INT AUTO_INCREMENT PRIMARY KEY,
        NAME VARCHAR(20),
        EMAIL VARCHAR(20)
    )`

    connection.execute(creationQuery, (err)=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }
        console.log('table is created');
    });
})

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, (err) => {
    console.log('server is Running...');
})