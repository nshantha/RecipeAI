# RecipeAI - YouTube Recipe Discovery and AI Generation App

RecipeAI combines YouTube's cooking content with AI to help you discover, organize, and create amazing recipes.

## Features

- **YouTube Integration**: Browse recipes from top content creators by cuisine
- **Structured Recipes**: Get clear, step-by-step instructions extracted from videos
- **AI Recipe Generation**: Create custom recipes based on preferences, ingredients, and dietary restrictions
- **Creator Discovery**: Find and follow top cooking channels on YouTube
- **Recipe Organization**: Save favorite recipes and create collections

## Tech Stack

### Frontend
- React.js
- Material UI
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- YouTube Data API
- OpenAI API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)
- YouTube Data API key
- OpenAI API key

### Installation

1. Clone the repository
```
git clone <repository-url>
cd recipe-ai-app
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Configure environment variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-ai-app
YOUTUBE_API_KEY=your_youtube_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

4. Install frontend dependencies
```
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```
cd backend
npm start
```

2. Start the frontend development server
```
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### YouTube Integration
- `GET /api/youtube/channels/:cuisine` - Get cooking channels by cuisine
- `GET /api/youtube/channels/:channelId/videos` - Get videos from a specific channel
- `GET /api/youtube/videos/:videoId` - Get video details
- `GET /api/youtube/search/recipes` - Search for recipes

### Recipe Operations
- `GET /api/recipes/extract/:videoId` - Extract recipe from a YouTube video
- `POST /api/recipes/generate` - Generate a new recipe based on parameters

## Getting API Keys

### YouTube Data API
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the YouTube Data API v3
4. Create an API key
5. Add the API key to your `.env` file

### OpenAI API
1. Create an account on [OpenAI](https://openai.com/)
2. Navigate to the API section
3. Create a new API key
4. Add the API key to your `.env` file

## Next Steps and Enhancements

- User authentication and profiles
- Recipe saving and collections
- Social sharing features
- Enhanced AI-powered recipe recommendations
- Mobile app version
- Integration with grocery delivery services