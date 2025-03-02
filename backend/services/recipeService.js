const { OpenAI } = require('openai');

class RecipeService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Extract recipe steps and ingredients from video description
  async extractRecipeFromDescription(videoDescription, videoTitle) {
    try {
      const prompt = `
      Extract the recipe information from the following YouTube video description and title.
      
      Video Title: ${videoTitle}
      Video Description: ${videoDescription}
      
      Please extract and structure the following information:
      1. Recipe Name
      2. Ingredients with quantities
      3. Step-by-step cooking instructions
      4. Cooking time
      5. Serving size
      6. Difficulty level (Easy, Medium, Hard)
      
      Format the output as a JSON object with the following structure:
      {
        "name": "Recipe Name",
        "ingredients": [{"name": "Ingredient 1", "quantity": "amount"}, ...],
        "instructions": ["Step 1", "Step 2", ...],
        "cookingTime": "X minutes/hours",
        "servings": "X servings",
        "difficulty": "Easy/Medium/Hard"
      }
      
      If any information is not available in the description, use "Unknown" or make a reasonable guess based on the recipe type.
      `;
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4", // or any appropriate model
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      });
      
      // Parse the JSON from the response
      const content = response.choices[0].message.content;
      let recipeData;
      
      try {
        recipeData = JSON.parse(content);
      } catch (error) {
        // If JSON parsing fails, extract what we can
        console.error('Failed to parse JSON from AI response, returning raw content');
        return { error: 'Failed to parse recipe data', rawContent: content };
      }
      
      return recipeData;
    } catch (error) {
      console.error('Error extracting recipe:', error);
      throw error;
    }
  }

  // Generate a new recipe based on parameters
  async generateRecipe(cuisine, ingredients = [], dietary = [], difficulty = 'Medium') {
    try {
      const prompt = `
      Create a unique recipe with the following parameters:
      
      Cuisine: ${cuisine}
      Available ingredients: ${ingredients.join(', ') || 'Any common ingredients'}
      Dietary restrictions: ${dietary.join(', ') || 'None'}
      Difficulty level: ${difficulty}
      
      Please generate a complete recipe with the following structure:
      {
        "name": "A creative name for the recipe",
        "description": "A brief description of the dish",
        "ingredients": [{"name": "Ingredient 1", "quantity": "amount"}, ...],
        "instructions": ["Step 1", "Step 2", ...],
        "cookingTime": "X minutes/hours",
        "prepTime": "X minutes",
        "servings": "X servings",
        "difficulty": "${difficulty}",
        "nutritionalInfo": {
          "calories": "X per serving",
          "protein": "X g",
          "carbs": "X g",
          "fat": "X g"
        }
      }
      
      Make the recipe interesting, unique, and delicious while following the given parameters.
      `;
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4", // or any appropriate model
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7, // Higher temperature for creativity
      });
      
      // Parse the JSON from the response
      const content = response.choices[0].message.content;
      let recipeData;
      
      try {
        recipeData = JSON.parse(content);
      } catch (error) {
        // If JSON parsing fails, extract what we can
        console.error('Failed to parse JSON from AI response, returning raw content');
        return { error: 'Failed to parse recipe data', rawContent: content };
      }
      
      return recipeData;
    } catch (error) {
      console.error('Error generating recipe:', error);
      throw error;
    }
  }
}

module.exports = new RecipeService();
