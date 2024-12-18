const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

const apiKey = process.env.KEY_GEMINI;
const genAI = new GoogleGenerativeAI(apiKey);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat();

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);   
});
