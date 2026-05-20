const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./utils/db-connection');
const path = require('path');
require('./models/index');

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const login = path.join(__dirname, "view", "login.html");
const signUp = path.join(__dirname, "view", "signup.html");
const hom = path.join(__dirname, "view", "index.html");
const expense = path.join(__dirname, "view", "expense.html");

const userRouter = require('./routers/userRouter');
const expenseRouter = require('./routers/expenseRouter');


app.get('/login', (req, res) => {
    res.sendFile(login);
});

app.get('/signup', (req, res) => {
    res.sendFile(signUp);
});

app.get('/expenses', (req, res) => {
    res.sendFile(expense);
});

app.get('/', (req, res) => {
    res.sendFile(hom);
});


app.use('/users', userRouter);
app.use('/expenses', expenseRouter);


db.sync().then(() => {
    app.listen(3000, () => console.log("Online...."));
}).catch((err) => {
    console.log('Unable to sync Data Base : ' + err.message);
})