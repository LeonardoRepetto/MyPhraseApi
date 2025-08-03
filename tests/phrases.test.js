const request = require('supertest');
const app = require('../src/app');

describe('Phrases API', () => {
  describe('GET /api/phrases', () => {
    it('should return all phrases', async () => {
      const response = await request(app)
        .get('/api/phrases')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
    });
  });

  describe('GET /api/phrases/:id', () => {
    it('should return a specific phrase', async () => {
      const response = await request(app)
        .get('/api/phrases/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe('1');
      expect(response.body.data.text).toBeDefined();
    });

    it('should return 404 for non-existent phrase', async () => {
      const response = await request(app)
        .get('/api/phrases/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Phrase not found');
    });
  });

  describe('POST /api/phrases', () => {
    it('should create a new phrase', async () => {
      const newPhrase = {
        text: 'Test phrase for testing purposes',
        author: 'Test Author',
        category: 'test',
        language: 'en'
      };

      const response = await request(app)
        .post('/api/phrases')
        .send(newPhrase)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.text).toBe(newPhrase.text);
      expect(response.body.data.author).toBe(newPhrase.author);
      expect(response.body.data.id).toBeDefined();
    });

    it('should validate required fields', async () => {
      const invalidPhrase = {
        author: 'Test Author'
        // Missing text field
      };

      const response = await request(app)
        .post('/api/phrases')
        .send(invalidPhrase)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('PUT /api/phrases/:id', () => {
    it('should update an existing phrase', async () => {
      const updateData = {
        text: 'Updated test phrase',
        author: 'Updated Author'
      };

      const response = await request(app)
        .put('/api/phrases/1')
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.text).toBe(updateData.text);
      expect(response.body.data.author).toBe(updateData.author);
    });

    it('should return 404 for non-existent phrase', async () => {
      const updateData = {
        text: 'Updated test phrase'
      };

      const response = await request(app)
        .put('/api/phrases/999')
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Phrase not found');
    });
  });

  describe('DELETE /api/phrases/:id', () => {
    it('should delete an existing phrase', async () => {
      const response = await request(app)
        .delete('/api/phrases/2')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Phrase deleted successfully');
    });

    it('should return 404 for non-existent phrase', async () => {
      const response = await request(app)
        .delete('/api/phrases/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Phrase not found');
    });
  });

  describe('GET /api/phrases/random/one', () => {
    it('should return a random phrase', async () => {
      const response = await request(app)
        .get('/api/phrases/random/one')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.text).toBeDefined();
    });
  });

  describe('GET /api/phrases/random/:count', () => {
    it('should return multiple random phrases', async () => {
      const response = await request(app)
        .get('/api/phrases/random/3')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBe(3);
    });

    it('should validate count parameter', async () => {
      const response = await request(app)
        .get('/api/phrases/random/100')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Count must be between 1 and 50');
    });
  });
});

describe('Health Check', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
    expect(response.body.uptime).toBeDefined();
  });
});

describe('Root Endpoint', () => {
  it('should return API information', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.body.message).toBe('Welcome to MyPhraseApi');
    expect(response.body.version).toBe('1.0.0');
    expect(response.body.endpoints).toBeDefined();
  });
}); 