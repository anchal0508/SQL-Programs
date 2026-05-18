const express = require('express');
const userRouter = require('./router/userRouter');
const db = require('./utils/db-connection');
const cors =require('cors');
const app = express();

const path = require('path');
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

const filepath = path.join(__dirname, "view", "signup.html");
app.use('/', (req, res) => {
    res.sendFile(filepath)
});





db.sync({alter: true}).then(() => {
    app.listen(3000, () => console.log('Online...'));
}).catch((err) => {
    console.log('DB not sync ' + err.message);
})