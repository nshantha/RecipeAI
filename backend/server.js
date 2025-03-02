const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const youtubeRoutes = require('./routes/youtube');
const recipeRoutes = require('./routes/recipes');

// Use routes
app.use('/api/youtube', youtubeRoutes);
app.use('/api/recipes', recipeRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Recipe AI API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});