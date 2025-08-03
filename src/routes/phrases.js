const express = require('express');
const router = express.Router();
const phrasesController = require('../controllers/phrasesController');
const { validatePhrase } = require('../middleware/validation');
const { requireAuth, requireValidOrigin } = require('../middleware/auth');

// GET all phrases - Requiere autenticación
router.get('/', requireAuth, phrasesController.getAllPhrases);

// GET phrase by ID - Requiere autenticación
router.get('/:id', requireAuth, phrasesController.getPhraseById);

// POST create new phrase - Requiere autenticación
router.post('/', requireAuth, validatePhrase, phrasesController.createPhrase);

// PUT update phrase - Requiere autenticación
router.put('/:id', requireAuth, validatePhrase, phrasesController.updatePhrase);

// DELETE phrase - Requiere autenticación
router.delete('/:id', requireAuth, phrasesController.deletePhrase);

// GET random phrase - Solo requiere origen válido
router.get('/random/one', requireValidOrigin, phrasesController.getRandomPhrase);

// GET multiple random phrases - Solo requiere origen válido
router.get('/random/:count', requireValidOrigin, phrasesController.getRandomPhrases);

module.exports = router; 