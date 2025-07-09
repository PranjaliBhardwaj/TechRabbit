const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

// Mongoose Card schema
const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  section: { type: String, enum: ['scholarship', 'internship', 'mentorship'], required: true },
  image: { type: String },
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);

const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET /cards?section=scholarship|internship|mentorship
router.get('/', async (req, res) => {
  try {
    const filter = req.query.section ? { section: req.query.section } : {};
    const cards = await Card.find(filter).sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// POST /cards
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, section } = req.body;
    if (!title || !description || !section) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const card = new Card({
      title,
      description,
      section,
      image: req.file ? req.file.filename : null
    });
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// PUT /cards/:id
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, section } = req.body;
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    if (req.file) {
      // Delete old image if exists
      if (card.image) {
        const oldPath = path.join(UPLOADS_DIR, card.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      card.image = req.file.filename;
    }
    if (title) card.title = title;
    if (description) card.description = description;
    if (section) card.section = section;
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// DELETE /cards/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    // Delete image if exists
    if (card.image) {
      const imgPath = path.join(UPLOADS_DIR, card.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await Card.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

module.exports = router; 