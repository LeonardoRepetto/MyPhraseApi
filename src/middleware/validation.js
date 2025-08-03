// Validation middleware
const validatePhrase = (req, res, next) => {
  const { text, author, category, language } = req.body;

  const errors = [];

  // Validate text
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    errors.push('Text is required and must be a non-empty string');
  } else if (text.length > 1000) {
    errors.push('Text must be less than 1000 characters');
  }

  // Validate author (optional but if provided, must be valid)
  if (author && (typeof author !== 'string' || author.trim().length === 0)) {
    errors.push('Author must be a non-empty string if provided');
  }

  // Validate category (optional but if provided, must be valid)
  if (category && (typeof category !== 'string' || category.trim().length === 0)) {
    errors.push('Category must be a non-empty string if provided');
  }

  // Validate language (optional but if provided, must be valid)
  if (language && (typeof language !== 'string' || language.trim().length === 0)) {
    errors.push('Language must be a non-empty string if provided');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize the data
  req.body.text = text.trim();
  if (author) req.body.author = author.trim();
  if (category) req.body.category = category.trim();
  if (language) req.body.language = language.trim();

  next();
};

// Validate ID parameter
const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || id.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'ID parameter is required'
    });
  }

  // Check if ID is a valid format (you can customize this based on your ID format)
  if (!/^[a-zA-Z0-9-_]+$/.test(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }

  req.params.id = id.trim();
  next();
};

module.exports = {
  validatePhrase,
  validateId
}; 