const express = require('express');
const app = express();
const db = require('./utils/db-connection');
const paymentRouters= require('./routes/paymentRoutes');
const path = require('path');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/payment', paymentRouters);

const file = path.join(__dirname, "views", "index.html");
app.use('/', (req, res)=>{
    res.sendFile(file);
})

db.sync().then(() => {
    app.listen(3000, () => console.log("Online..."))
}).catch((err) => {
    console.log('Unable to sync with DB ', err.message);
})