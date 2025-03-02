// backend/models/Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  cuisine: {
    type: String,
    required: true
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    }
  }],
  instructions: [{
    type: String,
    required: true
  }],
  cookingTime: {
    type: String,
    required: false
  },
  prepTime: {
    type: String,
    required: false
  },
  servings: {
    type: String,
    required: false
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  nutritionalInfo: {
    calories: String,
    protein: String,
    carbs: String,
    fat: String
  },
  // YouTube video info
  videoId: {
    type: String,
    required: false
  },
  channelId: {
    type: String,
    required: false
  },
  channelTitle: {
    type: String,
    required: false
  },
  thumbnailUrl: {
    type: String,
    required: false
  },
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  isGenerated: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);