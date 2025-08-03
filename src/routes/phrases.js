const express = require('express');
const router = express.Router();
const phrasesController = require('../controllers/phrasesController');
const { validatePhrase } = require('../middleware/validation');

// GET all phrases
router.get('/', phrasesController.getAllPhrases);

// GET phrase by ID
router.get('/:id', phrasesController.getPhraseById);

// POST create new phrase
router.post('/', validatePhrase, phrasesController.createPhrase);

// PUT update phrase
router.put('/:id', validatePhrase, phrasesController.updatePhrase);

// DELETE phrase
router.delete('/:id', phrasesController.deletePhrase);

// GET random phrase
router.get('/random/one', phrasesController.getRandomPhrase);

// GET multiple random phrases
router.get('/random/:count', phrasesController.getRandomPhrases);

module.exports = router; 