import { recipeData } from "./data.js";

// Get DOM elements
const recipeGrid = document.getElementById("recipe-grid");
const moodFilters = document.querySelectorAll(".mood-filter");

// Function to create a recipe card
function createRecipeCard(recipe) {
  const recipeUrl = `/recipe.html?name=${encodeURIComponent(
    recipe.name
  )}&mood=${encodeURIComponent(recipe.mood)}`;
  return `
        <a href="${recipeUrl}" class="recipe-card rounded-xl shadow-xl overflow-hidden border border-[#2d1b69] block hover:no-underline">
            <div class="relative">
                <img src="${recipe.image_url}" alt="${recipe.name}" class="w-full h-64 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-[#1a1625] to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4">
                    <h3 class="text-2xl font-bold text-white playfair mb-2">${recipe.name}</h3>
                    <div class="flex items-center space-x-2">
                        <span class="px-3 py-1 rounded-full text-sm text-white bg-[#ff6b6b]">${recipe.mood}</span>
                    </div>
                </div>
            </div>
            <div class="p-6">
                <div class="mb-4">
                    <h4 class="text-lg font-semibold text-[#ff6b6b] mb-2">Ingredients</h4>
                    <p class="text-gray-300 text-sm">${recipe.ingredients}</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-[#ff6b6b] mb-2">Instructions</h4>
                    <p class="text-gray-300 text-sm whitespace-pre-line">${recipe.instructions}</p>
                </div>
            </div>
        </a>
    `;
}

// Function to display recipes
function displayRecipes(recipes) {
  recipeGrid.innerHTML = recipes
    .map((recipe) => createRecipeCard(recipe))
    .join("");
}

// Function to filter recipes by mood
function filterRecipes(mood) {
  if (mood === "all") {
    return Object.values(recipeData).flat();
  }
  return recipeData[mood] || [];
}

// Initialize the page
function initializePage() {
  // Display all recipes initially
  displayRecipes(filterRecipes("all"));

  // Add click event listeners to mood filters
  moodFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      // Remove active class from all filters
      moodFilters.forEach((f) => f.classList.remove("active"));
      // Add active class to clicked filter
      filter.classList.add("active");

      // Filter and display recipes
      const mood = filter.dataset.mood;
      const filteredRecipes = filterRecipes(mood);
      displayRecipes(filteredRecipes);
    });
  });
}

// Start the application
initializePage();
