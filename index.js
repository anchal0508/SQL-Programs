const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
const userTable = require('./models/user');
const db = require('./util/db-connection');
const userRoutes = require('./routes/userRoute');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.static('public'));

const filePath = path.join(__dirname, ".", "view", "user.html");

app.get('/', (req, res) => {
    res.sendFile(filePath);
})


app.use('/users', userRoutes);



db.sync().then(() => {
    app.listen(3000, () => console.log('Online...'));
}).catch((err) => {
    console.log(err);
})