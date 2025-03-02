// backend/routes/recipes.js
const express = require('express');
const router = express.Router();
const recipeService = require('../services/recipeService');
const youtubeService = require('../services/youtubeService');

// Extract recipe from a YouTube video
router.get('/extract/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    // First, get the video details from YouTube
    const videoDetails = await youtubeService.getVideoDetails(videoId);
    const videoTitle = videoDetails.snippet.title;
    const videoDescription = videoDetails.snippet.description;
    
    // Then, extract the recipe information
    const recipeData = await recipeService.extractRecipeFromDescription(videoDescription, videoTitle);
    
    // Return the data with video information
    res.json({
      videoId,
      videoTitle,
      thumbnailUrl: videoDetails.snippet.thumbnails.high.url,
      channelTitle: videoDetails.snippet.channelTitle,
      publishedAt: videoDetails.snippet.publishedAt,
      viewCount: videoDetails.statistics.viewCount,
      recipe: recipeData
    });
  } catch (error) {
    res.status(500).json({ message: 'Error extracting recipe', error: error.message });
  }
});

// Generate a new recipe
router.post('/generate', async (req, res) => {
  try {
    const { cuisine, ingredients, dietary, difficulty } = req.body;
    
    // Validate required parameters
    if (!cuisine) {
      return res.status(400).json({ message: 'Cuisine is required' });
    }
    
    const recipeData = await recipeService.generateRecipe(
      cuisine, 
      ingredients || [], 
      dietary || [], 
      difficulty || 'Medium'
    );
    
    res.json(recipeData);
  } catch (error) {
    res.status(500).json({ message: 'Error generating recipe', error: error.message });
  }
});

module.exports = router;
