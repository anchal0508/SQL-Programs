const express = require('express');
const app = express();
const db = require('./utils/db-connections');
const studentsRoutes = require('./routes/studentRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Check tables now...</h1>');
})


app.use('/students', studentsRoutes);


app.listen(3000, () => console.log("online..."));