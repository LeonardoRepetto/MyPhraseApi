# MyPhraseApi

A modern Node.js REST API for managing and retrieving inspirational phrases. Built with Express.js, featuring security best practices, comprehensive error handling, and a clean architecture.

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete phrases
- **Random Phrase Generation**: Get random phrases for inspiration
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Error Handling**: Centralized error management with proper HTTP status codes
- **Testing**: Comprehensive test suite with Jest and Supertest
- **Code Quality**: ESLint configuration for consistent code style
- **Documentation**: Well-documented API endpoints

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MyPhraseApi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### Base URL
```
http://localhost:3000
```

### Health Check
- **GET** `/health` - Check API health status

### Phrases

#### Get All Phrases
- **GET** `/api/phrases`
- **Response**: List of all phrases

#### Get Phrase by ID
- **GET** `/api/phrases/:id`
- **Response**: Single phrase object

#### Create New Phrase
- **POST** `/api/phrases`
- **Body**:
```json
{
  "text": "Your inspirational phrase here",
  "author": "Author Name",
  "category": "motivational",
  "language": "es"
}
```

#### Update Phrase
- **PUT** `/api/phrases/:id`
- **Body**: Same as POST (all fields optional)

#### Delete Phrase
- **DELETE** `/api/phrases/:id`

#### Get Random Phrase
- **GET** `/api/phrases/random/one`

#### Get Multiple Random Phrases
- **GET** `/api/phrases/random/:count` (1-50)

## 🏗️ Project Structure

```
MyPhraseApi/
├── src/
│   ├── app.js              # Main application file
│   ├── routes/
│   │   └── phrases.js      # Phrase routes
│   ├── controllers/
│   │   └── phrasesController.js  # Business logic
│   ├── services/
│   │   └── phrasesService.js     # Data layer
│   └── middleware/
│       ├── errorHandler.js # Error handling
│       └── validation.js   # Input validation
├── tests/
│   └── phrases.test.js     # API tests
├── package.json
├── .eslintrc.js
├── .gitignore
├── env.example
└── README.md
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## 🔧 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Check code style
- `npm run lint:fix` - Fix code style issues

### Code Quality

The project uses ESLint for code quality. Run:
```bash
npm run lint
```

To automatically fix issues:
```bash
npm run lint:fix
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: Prevents abuse (100 requests per 15 minutes)
- **Input Validation**: Sanitizes and validates all inputs
- **Error Handling**: Prevents information leakage

## 🌍 Environment Variables

Create a `.env` file based on `env.example`:

```env
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## 📝 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "count": 1,
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## 🚀 Deployment

### Production Setup

1. Set environment variables:
```bash
NODE_ENV=production
PORT=3000
```

2. Install dependencies:
```bash
npm install --production
```

3. Start the server:
```bash
npm start
```

### Docker (Optional)

Create a `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy coding! 🎉**