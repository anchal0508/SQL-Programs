const express = require('express');
const app = express();
const db = require('./utils/db-connection');
const usersRoute = require('./routes/usersRoute');
const cors = require('cors');
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
const path = require('path');
const filepath = path.join(__dirname, ".", "view", "registration.html");


app.get('/', (req, res) => {
    res.sendFile(filepath);
})

// Users routing section
app.use('/api/users', usersRoute);

db.sync().then(() => {
    app.listen(3000, () => console.log("online..."));
}).catch((err) => {
    console.log(err);
})
