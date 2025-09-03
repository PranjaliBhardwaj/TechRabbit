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
  section: { type: String, enum: ['scholarship', 'internship', 'mentorship', 'course', 'opensource', 'extracurricular', 'category'], required: true },
  image: { type: String },
  parentCardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' }, // For nested cards
  isNested: { type: Boolean, default: false }, // Flag to identify nested cards
  nestedData: {
    videoUrl: String,
    duration: String,
    level: String,
    price: String,
    enrollmentUrl: String,
    curriculum: [String],
    instructor: String,
    rating: Number,
    reviews: Number,
    courseDescription: String,
    courseType: String
  }
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

// Session-based admin auth
const authenticateAdmin = (req, res, next) => {
  if (req.session && req.session.isAdmin) return next();
  return res.status(401).json({ error: 'Unauthorized' });
};

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

// GET /cards/:id - Get a specific card by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch card' });
  }
});

// POST /cards
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, section, nestedData } = req.body;
    
    // Debug: Log the received data
    console.log('Backend received data:', {
      title,
      description,
      section,
      nestedData,
      hasFile: !!req.file
    });
    console.log('Raw body:', req.body);
    console.log('All form fields:', Object.keys(req.body));
    
    if (!title || !description || !section) {
      return res.status(400).json({ error: 'Missing required fields: title, description, section' });
    }
    
    const cardData = {
      title,
      description,
      section,
      image: req.file ? req.file.filename : null
    };
    
    // Handle nestedData if provided
    if (nestedData) {
      try {
        const parsedNestedData = JSON.parse(nestedData);
        console.log('Parsed nestedData:', parsedNestedData);
        cardData.nestedData = parsedNestedData;
      } catch (parseError) {
        console.error('Error parsing nestedData:', parseError);
        return res.status(400).json({ error: 'Invalid nestedData format' });
      }
    }
    
    console.log('Final cardData to save:', cardData);
    
    const card = new Card(cardData);
    await card.save();
    console.log('Saved card:', card);
    res.status(201).json(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: `Validation error: ${err.message}` });
    }
    res.status(500).json({ error: `Failed to create card: ${err.message}` });
  }
});

// PUT /cards/:id
router.put('/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, section, nestedData } = req.body;
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
    
    // Handle nestedData if provided
    if (nestedData) {
      try {
        const parsedNestedData = JSON.parse(nestedData);
        card.nestedData = parsedNestedData;
      } catch (parseError) {
        console.error('Error parsing nestedData:', parseError);
        return res.status(400).json({ error: 'Invalid nestedData format' });
      }
    }
    
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// DELETE /cards/:id
router.delete('/:id', authenticateAdmin, async (req, res) => {
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

// GET /cards/:id/nested/:nestedId - Get a specific nested card (MUST come before the general nested route)
router.get('/:id/nested/:nestedId', async (req, res) => {
  try {
    const { id, nestedId } = req.params;
    const nestedCard = await Card.findOne({ _id: nestedId, parentCardId: id, isNested: true });
    
    if (!nestedCard) {
      return res.status(404).json({ error: 'Nested card not found' });
    }
    
    res.json(nestedCard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch nested card' });
  }
});

// GET /cards/:id/nested - Get nested cards for a specific card
router.get('/:id/nested', async (req, res) => {
  try {
    const { id } = req.params;
    const nestedCards = await Card.find({ parentCardId: id, isNested: true }).sort({ createdAt: -1 });
    res.json(nestedCards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch nested cards' });
  }
});

// POST /cards/:id/nested - Create a nested card
router.post('/:id/nested', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, nestedData } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify parent card exists
    const parentCard = await Card.findById(id);
    if (!parentCard) {
      return res.status(404).json({ error: 'Parent card not found' });
    }

    const nestedCard = new Card({
      title,
      description,
      section: parentCard.section, // Inherit section from parent
      image: req.file ? req.file.filename : null,
      parentCardId: id,
      isNested: true,
      nestedData: nestedData ? JSON.parse(nestedData) : {}
    });

    await nestedCard.save();
    res.status(201).json(nestedCard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create nested card' });
  }
});

// PUT /cards/:id/nested/:nestedId - Update a nested card
router.put('/:id/nested/:nestedId', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { id, nestedId } = req.params;
    const { title, description, nestedData } = req.body;
    
    const nestedCard = await Card.findOne({ _id: nestedId, parentCardId: id, isNested: true });
    if (!nestedCard) {
      return res.status(404).json({ error: 'Nested card not found' });
    }

    if (req.file) {
      // Delete old image if exists
      if (nestedCard.image) {
        const oldPath = path.join(UPLOADS_DIR, nestedCard.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      nestedCard.image = req.file.filename;
    }

    if (title) nestedCard.title = title;
    if (description) nestedCard.description = description;
    if (nestedData) nestedCard.nestedData = JSON.parse(nestedData);

    await nestedCard.save();
    res.json(nestedCard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update nested card' });
  }
});

// DELETE /cards/:id/nested/:nestedId - Delete a nested card
router.delete('/:id/nested/:nestedId', authenticateAdmin, async (req, res) => {
  try {
    const { id, nestedId } = req.params;
    
    const nestedCard = await Card.findOne({ _id: nestedId, parentCardId: id, isNested: true });
    if (!nestedCard) {
      return res.status(500).json({ error: 'Nested card not found' });
    }

    // Delete image if exists
    if (nestedCard.image) {
      const imgPath = path.join(UPLOADS_DIR, nestedCard.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Card.deleteOne({ _id: nestedId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete nested card' });
  }
});

module.exports = router; 