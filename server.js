require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', paymentRoutes);


// Error Handling Middleware

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
