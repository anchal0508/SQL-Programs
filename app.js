const express = require('express');
const db = require('./utils/db-connection');
const cors = require('cors');
const path = require('path');
const playerRouter = require('./routers/playerRouter');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
const filePath = path.join(__dirname, "view", "players.html");
app.get('/', (req, res) => {
    res.sendFile(filePath);
});


app.use('/players', playerRouter);




db.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log('Online...');
    })
}).catch((err) => {
    console.log("Error Sync DataBase: " + err.message);
})