
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./utils/db-connection');
const path = require('path');
app.use(express.urlencoded({extended: true}));




const { v4: uuidv4 } = require('uuid');

uuidv4(); // ⇨ 'ab16e731-6cee-424d-81a0-5929e9bdb0cc'



require('./models/index');

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const login = path.join(__dirname, "view", "login.html");
const signUp = path.join(__dirname, "view", "signup.html");
const hom = path.join(__dirname, "view", "index.html");
const expense = path.join(__dirname, "view", "expense.html");
const forgotPassword = path.join(__dirname, "view", "forgotPass.html");

const userRouter = require('./routers/userRouter');
const expenseRouter = require('./routers/expenseRouter');


app.get('/login', (req, res) => {
    res.sendFile(login);
});

app.get('/signup', (req, res) => {
    res.sendFile(signUp);
});
app.get('/forgotpass', (req, res) => {
    res.sendFile(forgotPassword);
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