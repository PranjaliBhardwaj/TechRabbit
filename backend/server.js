// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const cardsRouter = require('./cards');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cards API
app.use('/cards', cardsRouter);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/techrabbit';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  try {
    const messages = history && Array.isArray(history) && history.length > 0
      ? history
      : [{ role: 'user', content: message }];
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('OpenAI API response:', response.data);
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
