const express = require('express');
const app = express();
const db = require('./utils/db-connection');
require('./models/index');
const userRoutes = require('./routes/userRoutes');
const UserTable = require('./models/user');


app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api', userRoutes);

db.sync({ force: true }).then(() => {
    app.listen(3000, () => console.log('Online...'));
}).catch((error)=>{
    console.log(error.message);
})