const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const db = require('./utils/db-connection');
const expenseRoute = require('./router/expenseroute');

app.use(express.static('public'));
const path = require('path');
const filepath = path.join(__dirname, ".", "view", "expense.html");

app.get('/', (req, res) => {
    res.sendFile(filepath);
});

app.use('/expenses', expenseRoute);



db.sync().then(() => {
    app.listen(3000, () => console.log('Online....'));
}).catch((err) => {
    console.log(err.message);
})
