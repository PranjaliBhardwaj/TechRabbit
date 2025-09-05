const express = require('express');
require('dotenv').config();

const router = express.Router();

// Simple in-memory admin credentials from env
// Support both ADMIN_USER/ADMIN_PASS and ADMIN_USERNAME/ADMIN_PASSWORD
const ADMIN_USER = process.env.ADMIN_USER || process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || process.env.ADMIN_PASSWORD || 'change-me';

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    return res.json({ ok: true });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('trsid');
    return res.json({ ok: true });
  });
});

router.get('/me', (req, res) => {
  return res.json({ isAdmin: !!req.session.isAdmin });
});

module.exports = router;


