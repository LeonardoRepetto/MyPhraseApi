const phrasesService = require('../services/phrasesService');

class PhrasesController {
  // Get all phrases
  async getAllPhrases(req, res, next) {
    try {
      const phrases = await phrasesService.getAllPhrases();
      res.json({
        success: true,
        data: phrases,
        count: phrases.length
      });
    } catch (error) {
      next(error);
    }
  }

  // Get phrase by ID
  async getPhraseById(req, res, next) {
    try {
      const { id } = req.params;
      const phrase = await phrasesService.getPhraseById(id);
      
      if (!phrase) {
        return res.status(404).json({
          success: false,
          error: 'Phrase not found'
        });
      }

      res.json({
        success: true,
        data: phrase
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new phrase
  async createPhrase(req, res, next) {
    try {
      const phraseData = req.body;
      const newPhrase = await phrasesService.createPhrase(phraseData);
      
      res.status(201).json({
        success: true,
        data: newPhrase,
        message: 'Phrase created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Update phrase
  async updatePhrase(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedPhrase = await phrasesService.updatePhrase(id, updateData);
      
      if (!updatedPhrase) {
        return res.status(404).json({
          success: false,
          error: 'Phrase not found'
        });
      }

      res.json({
        success: true,
        data: updatedPhrase,
        message: 'Phrase updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete phrase
  async deletePhrase(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await phrasesService.deletePhrase(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Phrase not found'
        });
      }

      res.json({
        success: true,
        message: 'Phrase deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Get random phrase
  async getRandomPhrase(req, res, next) {
    try {
      const phrase = await phrasesService.getRandomPhrase();
      
      if (!phrase) {
        return res.status(404).json({
          success: false,
          error: 'No phrases available'
        });
      }

      res.json({
        success: true,
        data: phrase
      });
    } catch (error) {
      next(error);
    }
  }

  // Get multiple random phrases
  async getRandomPhrases(req, res, next) {
    try {
      const { count } = req.params;
      const numCount = parseInt(count) || 5;
      
      if (numCount < 1 || numCount > 50) {
        return res.status(400).json({
          success: false,
          error: 'Count must be between 1 and 50'
        });
      }

      const phrases = await phrasesService.getRandomPhrases(numCount);
      
      res.json({
        success: true,
        data: phrases,
        count: phrases.length
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PhrasesController(); 