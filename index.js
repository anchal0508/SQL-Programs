const express = require('express');
const userRouter = require('./routes/userRouter');
const busRouter = require('./routes/busRouter');
const db = require('./utils/db-connection');
const app = express();
app.use(express.json());


app.use('/users', userRouter);
app.use('/buses', busRouter);

app.get('/', (req, res)=>{
    res.send('<h1> 555-BUS SERVICES</h1>');
})

app.listen(3000, ()=> console.log('Bus Service is Online...'));