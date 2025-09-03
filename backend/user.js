const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const router = express.Router();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String, default: '/default_bunny.jpg' },
  notifications: {
    email: { type: Boolean, default: true },
    productUpdates: { type: Boolean, default: true },
    marketing: { type: Boolean, default: false }
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Reuse uploads directory setup like cards
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    req.session.userId = user._id.toString();
    return res.status(201).json({ id: user._id, name: user.name, email: user.email, avatar: user.avatar });
  } catch (e) {
    return res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    req.session.userId = user._id.toString();
    return res.json({ id: user._id, name: user.name, email: user.email, avatar: user.avatar });
  } catch (e) {
    return res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  req.session.userId = null;
  return res.json({ ok: true });
});

router.get('/me', async (req, res) => {
  try {
    if (!req.session.userId) return res.json({ user: null });
    const user = await User.findById(req.session.userId).select('name email avatar notifications');
    if (!user) return res.json({ user: null });
    return res.json({ user });
  } catch (e) {
    return res.status(500).json({ error: 'Failed' });
  }
});

router.put('/me', async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
    const { name, avatar, password, notifications, email } = req.body || {};
    const updates = {};
    if (name) updates.name = name;
    if (typeof avatar === 'string') updates.avatar = avatar;
    if (typeof email === 'string' && email.trim()) {
      const existing = await User.findOne({ email, _id: { $ne: req.session.userId } });
      if (existing) return res.status(409).json({ error: 'Email already in use' });
      updates.email = email.trim();
    }
    if (password) updates.passwordHash = await bcrypt.hash(password, 10);
    if (notifications && typeof notifications === 'object') {
      updates.notifications = {
        email: typeof notifications.email === 'boolean' ? notifications.email : undefined,
        productUpdates: typeof notifications.productUpdates === 'boolean' ? notifications.productUpdates : undefined,
        marketing: typeof notifications.marketing === 'boolean' ? notifications.marketing : undefined,
      };
      // Remove undefined keys to avoid overwriting
      Object.keys(updates.notifications).forEach(k => updates.notifications[k] === undefined && delete updates.notifications[k]);
      if (Object.keys(updates.notifications).length === 0) delete updates.notifications;
    }
    const user = await User.findByIdAndUpdate(req.session.userId, updates, { new: true }).select('name email avatar notifications');
    return res.json({ user });
  } catch (e) {
    return res.status(500).json({ error: 'Update failed' });
  }
});

// Upload avatar file and update user's avatar
router.post('/me/avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    // Delete previous avatar file only if it was a local file path in our uploads folder
    const current = await User.findById(req.session.userId).select('avatar');
    if (current && current.avatar && !current.avatar.startsWith('http') && !current.avatar.startsWith('data:')) {
      const oldPath = path.join(UPLOADS_DIR, path.basename(current.avatar));
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch {}
      }
    }
    const filename = req.file.filename;
    const updated = await User.findByIdAndUpdate(
      req.session.userId,
      { avatar: filename },
      { new: true }
    ).select('name email avatar notifications');
    return res.json({ user: updated });
  } catch (e) {
    return res.status(500).json({ error: 'Avatar upload failed' });
  }
});

module.exports = router;


