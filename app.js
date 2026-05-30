require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./utils/db-connection');
const path = require('path');

const {GoogleGenAI} = require('@google/genai');


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


// AI implementation

// AI implementation section ko isse replace karein

app.post("/ask", async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMIMI_API_KEY });

        const responsefromAI = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `Analyze this expense description: "${prompt}".
                       Classify it into strictly ONE of these categories: "Petrol", "Food", "Study", "snacks" or "Others".
                       
                       - Khane pine ki cheezein (like burger, lunch, dinner, chai, maggie) -> "Food" ya "snacks"
                       - Travel, fuel, bike, car, cab, auto -> "Petrol"
                       - Padhai, books, fees, library, course -> "Study"


                       Return strictly a valid JSON object: {"category": "CategoryName"}. Do not use markdown.`
                
        });

        // AI ke text response ko clean karke object mein convert karein
        const cleanText = responsefromAI.text.trim();
        const jsonResponse = JSON.parse(cleanText);
        
        console.log("AI Predicted:", jsonResponse.category);
        
        // Frontend ko saaf category bhejein
        res.status(200).json({ category: jsonResponse.category });
    }
    catch (error) {
        console.error("AI Error:", error);
        // Fallback option taaki app crash na ho
        res.status(200).json({ category: "Others" });
    }
});



db.sync().then(() => {
    app.listen(3000, () => console.log("Online...."));
}).catch((err) => {
    console.log('Unable to sync Data Base : ' + err.message);
})