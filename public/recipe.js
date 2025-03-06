import { recipeData } from "./data.js";

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const recipeName = urlParams.get("name");
const recipeMood = urlParams.get("mood");

// Get DOM elements
const recipeImage = document.getElementById("recipe-image");
const recipeNameElement = document.getElementById("recipe-name");
const recipeMoodElement = document.getElementById("recipe-mood");
const recipeIngredients = document.getElementById("recipe-ingredients");
const recipeInstructions = document.getElementById("recipe-instructions");

// Function to find recipe by name and mood
function findRecipe(name, mood) {
  if (!recipeData[mood]) return null;
  return recipeData[mood].find((recipe) => recipe.name === name);
}

// Function to display recipe
function displayRecipe(recipe) {
  if (!recipe) {
    window.location.href = "/recipes";
    return;
  }

  // Update page title
  document.title = `${recipe.name} - Mood Recipe Finder`;

  // Update recipe content
  recipeImage.src = recipe.image_url;
  recipeImage.alt = recipe.name;
  recipeNameElement.textContent = recipe.name;
  recipeMoodElement.textContent = recipe.mood;
  recipeIngredients.textContent = recipe.ingredients;
  recipeInstructions.textContent = recipe.instructions;
}

// Initialize the page
function initializePage() {
  if (!recipeName || !recipeMood) {
    window.location.href = "/recipes";
    return;
  }

  const recipe = findRecipe(decodeURIComponent(recipeName), recipeMood);
  displayRecipe(recipe);
}

// Start the application
initializePage();
