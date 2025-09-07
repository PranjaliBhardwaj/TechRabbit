// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRouter = require('./auth');
const userRouter = require('./user');
const path = require('path');
const cardsRouter = require('./cards');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const MongoStore = require('connect-mongo');
require('dotenv').config();
console.log('Environment variables loaded:', {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  NODE_ENV: process.env.NODE_ENV,
  ADMIN_TOKEN_SET: !!process.env.ADMIN_TOKEN
});

const app = express();
const PORT = process.env.PORT || 5000;

// CORS with credentials for frontend origin(s)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGINS || FRONTEND_ORIGIN)
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const ALLOW_VERCEL_WILDCARD = (process.env.ALLOW_VERCEL_WILDCARD || 'false') === 'true';

const corsOptions = {
  origin: (origin, callback) => {
    // Allow same-origin or non-browser requests (no Origin header)
    if (!origin) return callback(null, true);

    if (FRONTEND_ORIGINS.includes(origin)) return callback(null, true);

    if (ALLOW_VERCEL_WILDCARD) {
      try {
        const hostname = new URL(origin).hostname;
        if (/\.vercel\.app$/.test(hostname)) return callback(null, true);
      } catch {}
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  name: 'trsid',
  secret: process.env.SESSION_SECRET || 'change-this-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    httpOnly: true,
    sameSite: (process.env.COOKIE_SAMESITE || 'lax'),
    secure: (process.env.NODE_ENV === 'production')
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Auth API
app.use('/auth', authRouter);
app.use('/user', userRouter);

// Cards API
app.use('/cards', cardsRouter);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/techrabbit';
console.log('Attempting to connect to MongoDB at:', MONGO_URI);

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  console.log('Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('\nTroubleshooting steps:');
  console.log('1. Make sure MongoDB is installed and running');
  console.log('2. Check if MongoDB service is started');
  console.log('3. Verify the connection string in your .env file');
  console.log('4. If using MongoDB Atlas, make sure the connection string is correct');
  process.exit(1);
});

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
