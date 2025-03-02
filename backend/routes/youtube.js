const express = require('express');
const router = express.Router();
const youtubeService = require('../services/youtubeService');

// Get cooking channels by cuisine
router.get('/channels/:cuisine', async (req, res) => {
  try {
    const { cuisine } = req.params;
    const { maxResults } = req.query;
    
    const channels = await youtubeService.searchCookingChannels(cuisine, maxResults);
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cooking channels', error: error.message });
  }
});

// Get videos from a specific channel
router.get('/channels/:channelId/videos', async (req, res) => {
  try {
    const { channelId } = req.params;
    const { maxResults } = req.query;
    
    const videos = await youtubeService.getChannelVideos(channelId, maxResults);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching channel videos', error: error.message });
  }
});

// Get video details
router.get('/videos/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const videoDetails = await youtubeService.getVideoDetails(videoId);
    res.json(videoDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video details', error: error.message });
  }
});

// Search for recipes
router.get('/search/recipes', async (req, res) => {
  try {
    const { keyword, maxResults } = req.query;
    
    const recipes = await youtubeService.searchRecipes(keyword, maxResults);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error searching recipes', error: error.message });
  }
});

module.exports = router;
