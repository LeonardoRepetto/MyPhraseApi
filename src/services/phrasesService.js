// In-memory storage for phrases (in a real app, this would be a database)
let phrases = [
  {
    id: '1',
    text: 'La vida es como una bicicleta, para mantener el equilibrio debes seguir adelante.',
    author: 'Albert Einstein',
    category: 'motivational',
    language: 'es',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    text: 'El éxito no es final, el fracaso no es fatal: lo que cuenta es el coraje para continuar.',
    author: 'Winston Churchill',
    category: 'motivational',
    language: 'es',
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-02').toISOString()
  },
  {
    id: '3',
    text: 'La creatividad es la inteligencia divirtiéndose.',
    author: 'Albert Einstein',
    category: 'creativity',
    language: 'es',
    createdAt: new Date('2024-01-03').toISOString(),
    updatedAt: new Date('2024-01-03').toISOString()
  }
];

let nextId = 4;

class PhrasesService {
  // Get all phrases
  async getAllPhrases() {
    return [...phrases];
  }

  // Get phrase by ID
  async getPhraseById(id) {
    return phrases.find(phrase => phrase.id === id);
  }

  // Create new phrase
  async createPhrase(phraseData) {
    const newPhrase = {
      id: nextId.toString(),
      text: phraseData.text,
      author: phraseData.author || 'Anonymous',
      category: phraseData.category || 'general',
      language: phraseData.language || 'es',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    phrases.push(newPhrase);
    nextId++;

    return newPhrase;
  }

  // Update phrase
  async updatePhrase(id, updateData) {
    const phraseIndex = phrases.findIndex(phrase => phrase.id === id);
    
    if (phraseIndex === -1) {
      return null;
    }

    phrases[phraseIndex] = {
      ...phrases[phraseIndex],
      ...updateData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    return phrases[phraseIndex];
  }

  // Delete phrase
  async deletePhrase(id) {
    const phraseIndex = phrases.findIndex(phrase => phrase.id === id);
    
    if (phraseIndex === -1) {
      return false;
    }

    phrases.splice(phraseIndex, 1);
    return true;
  }

  // Get random phrase
  async getRandomPhrase() {
    if (phrases.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  }

  // Get multiple random phrases
  async getRandomPhrases(count) {
    if (phrases.length === 0) {
      return [];
    }

    const shuffled = [...phrases].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, phrases.length));
  }

  // Search phrases by text
  async searchPhrases(query) {
    const searchTerm = query.toLowerCase();
    return phrases.filter(phrase => 
      phrase.text.toLowerCase().includes(searchTerm) ||
      phrase.author.toLowerCase().includes(searchTerm) ||
      phrase.category.toLowerCase().includes(searchTerm)
    );
  }

  // Get phrases by category
  async getPhrasesByCategory(category) {
    return phrases.filter(phrase => 
      phrase.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Get phrases by language
  async getPhrasesByLanguage(language) {
    return phrases.filter(phrase => 
      phrase.language.toLowerCase() === language.toLowerCase()
    );
  }
}

module.exports = new PhrasesService(); 