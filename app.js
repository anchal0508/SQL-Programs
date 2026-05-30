require("dotenv").config() 
let genai = require('@google/genai') 
let ai = new genai.GoogleGenAI({ apiKey: process.env.GEMIMI_API_KEY }) 

async function main() { 
  // Fixed the leading space in the model name string
  const response = await ai.models.generateContent({ 
    model: "gemini-3.5-flash", 
    contents: "what is java script" 
  }) 
  console.log(response.text); 
} 

main();
