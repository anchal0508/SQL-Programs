const express = require('express');
const app = express();
const db = require('./utils/db-connection');
const studentsRoute = require('./routes/studentsRoute');
const studentModel = require('./models/students');

app.use(express.json());




app.get('/', (req, res) => {
    res.send('<h1> Student Management API</h1>');
})

app.use('/students', studentsRoute);

db.sync().then(() => {
    
    app.listen(3000, () => console.log('Student Management API Project Online...'));

}).catch((err) => {
    console.log(err);
})
