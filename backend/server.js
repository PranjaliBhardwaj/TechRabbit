// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const cardsRouter = require('./cards');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
console.log('Environment variables loaded:', {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  NODE_ENV: process.env.NODE_ENV
});

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
mongoose.connect(MONGO_URI)
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

// Email endpoint for freelancing contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, details } = req.body;

    if (!name || !email || !details) {
      return res.status(400).json({ error: 'Missing required fields: name, email, details' });
    }

    // Debug: Log environment variables
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASS exists:', !!process.env.SMTP_PASS);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: (process.env.SMTP_SECURE || 'false') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toEmail = process.env.CONTACT_TO_EMAIL || "techrabbit14@gmail.com";

    await transporter.sendMail({
      from: `TechRabbit Contact <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Freelancing Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nDetails:\n${details}`,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
