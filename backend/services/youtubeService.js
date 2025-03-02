const axios = require('axios');

class YouTubeService {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY;
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
  }

  // Search for cooking channels based on cuisine
  async searchCookingChannels(cuisine, maxResults = 10) {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          part: 'snippet',
          q: `${cuisine} cooking recipes`,
          type: 'channel',
          maxResults,
          key: this.apiKey
        }
      });
      
      return response.data.items;
    } catch (error) {
      console.error('Error searching cooking channels:', error);
      throw error;
    }
  }

  // Get videos from a specific channel
  async getChannelVideos(channelId, maxResults = 15) {
    try {
      // First, get the upload playlist ID
      const channelResponse = await axios.get(`${this.baseUrl}/channels`, {
        params: {
          part: 'contentDetails',
          id: channelId,
          key: this.apiKey
        }
      });
      
      const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
      
      // Then get videos from that playlist
      const videosResponse = await axios.get(`${this.baseUrl}/playlistItems`, {
        params: {
          part: 'snippet,contentDetails',
          playlistId: uploadsPlaylistId,
          maxResults,
          key: this.apiKey
        }
      });
      
      return videosResponse.data.items;
    } catch (error) {
      console.error('Error getting channel videos:', error);
      throw error;
    }
  }

  // Get video details including description
  async getVideoDetails(videoId) {
    try {
      const response = await axios.get(`${this.baseUrl}/videos`, {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: videoId,
          key: this.apiKey
        }
      });
      
      return response.data.items[0];
    } catch (error) {
      console.error('Error getting video details:', error);
      throw error;
    }
  }

  // Search for recipes by keyword
  async searchRecipes(keyword, maxResults = 20) {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          part: 'snippet',
          q: `${keyword} recipe`,
          type: 'video',
          maxResults,
          key: this.apiKey
        }
      });
      
      return response.data.items;
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  }
}

module.exports = new YouTubeService();
