let currentMood = "";
let lastRecipeId = null;
let lastRecommendedRecipe = null;
let recognition = null;
let synth = null;
let isSpeaking = false;
let isListening = false;
let conversationMode = false;

// Initialize speech recognition
function initializeSpeechRecognition() {
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById("chat-input").value = transcript;
      document.getElementById("mic-button").classList.remove("recording");

      // Automatically submit the form after speech recognition
      document.getElementById("chat-form").dispatchEvent(new Event("submit"));
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      document.getElementById("mic-button").classList.remove("recording");
      isListening = false;
    };

    recognition.onend = () => {
      document.getElementById("mic-button").classList.remove("recording");
      isListening = false;

      // If in conversation mode and not speaking, restart listening
      if (conversationMode && !isSpeaking) {
        setTimeout(() => {
          startListening();
        }, 1000);
      }
    };
  }
}

// Function to start listening
function startListening() {
  if (!recognition) return;

  try {
    recognition.start();
    isListening = true;
    const micButton = document.getElementById("mic-button");
    micButton.classList.add("recording");
    micButton.querySelector(".recording-indicator").textContent =
      "Listening... (Click to stop)";
  } catch (error) {
    console.error("Error starting recognition:", error);
  }
}

// Function to stop listening
function stopListening() {
  if (!recognition) return;

  try {
    recognition.stop();
    isListening = false;
    const micButton = document.getElementById("mic-button");
    micButton.classList.remove("recording");
    micButton.querySelector(".recording-indicator").textContent =
      "Click to stop";
  } catch (error) {
    console.error("Error stopping recognition:", error);
  }
}

// Function to toggle conversation mode
function toggleConversationMode() {
  conversationMode = !conversationMode;
  const micButton = document.getElementById("mic-button");

  if (conversationMode) {
    micButton.classList.add("conversation-mode");
    startListening();
    addMessageToChat(
      "Voice conversation mode activated. I'm listening...",
      "bot"
    );
  } else {
    micButton.classList.remove("conversation-mode");
    stopListening();
    addMessageToChat("Voice conversation mode deactivated.", "bot");
  }
}

// Function to toggle speech recognition
function toggleSpeechRecognition() {
  if (!recognition) {
    initializeSpeechRecognition();
  }

  if (recognition) {
    if (conversationMode) {
      toggleConversationMode();
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
      // Add visual feedback that the mic is active
      const micButton = document.getElementById("mic-button");
      micButton.classList.add("recording");
      micButton.querySelector(".recording-indicator").textContent =
        "Listening... (Click to stop)";
    }
  } else {
    alert("Speech recognition is not supported in your browser.");
  }
}

// Initialize speech synthesis
function initializeSpeechSynthesis() {
  if ("speechSynthesis" in window) {
    synth = window.speechSynthesis;

    // Load voices when they are ready
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = synth.getVoices();
      console.log("Available voices loaded:", voices.length);
    };
  }
}

// Function to speak text
function speakText(text) {
  if (!synth) return;

  // Stop any ongoing speech
  synth.cancel();

  // Create a new utterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Configure the voice settings
  utterance.rate = 1.0; // Speed of speech
  utterance.pitch = 1.0; // Pitch of voice
  utterance.volume = 1.0; // Volume

  // Get available voices and set a natural sounding one
  const voices = synth.getVoices();
  const englishVoices = voices.filter((voice) => voice.lang.startsWith("en-"));
  if (englishVoices.length > 0) {
    // Prefer female voices for a more natural assistant sound
    const femaleVoice = englishVoices.find(
      (voice) => voice.name.includes("female") || voice.name.includes("Female")
    );
    utterance.voice = femaleVoice || englishVoices[0];
  }

  // Add event listeners
  utterance.onstart = () => {
    isSpeaking = true;
    document.getElementById("speak-toggle").classList.add("speaking");

    // Pause listening while speaking to prevent feedback
    if (isListening) {
      stopListening();
    }
  };

  utterance.onend = () => {
    isSpeaking = false;
    document.getElementById("speak-toggle").classList.remove("speaking");

    // Resume listening in conversation mode
    if (conversationMode) {
      setTimeout(() => {
        startListening();
      }, 500);
    }
  };

  // Speak the text
  synth.speak(utterance);
}

console.log("App.js loaded");

// Chat functionality
document.getElementById("chat-toggle").addEventListener("click", () => {
  document.getElementById("chat-container").classList.toggle("hidden");
  // Hide welcome popup if it exists
  const welcomePopup = document.querySelector(".welcome-popup")?.parentElement;
  if (welcomePopup) {
    welcomePopup.style.opacity = "0";
    setTimeout(() => welcomePopup.remove(), 500);
  }
});

document.getElementById("close-chat").addEventListener("click", () => {
  document.getElementById("chat-container").classList.add("hidden");
});

document.getElementById("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const message = input.value.trim();

  if (!message) return;

  // Add user message to chat
  addMessageToChat(message, "user");
  input.value = "";

  try {
    // Show typing indicator
    addTypingIndicator();

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    // Remove typing indicator
    removeTypingIndicator();

    // Add bot response to chat
    addMessageToChat(data.message, "bot", data.recipe);

    // Store the recommended recipe
    if (data.recipe) {
      lastRecommendedRecipe = data.recipe;
    }
  } catch (error) {
    console.error("Error:", error);
    removeTypingIndicator();
    addMessageToChat("Sorry, I encountered an error. Please try again.", "bot");
  }
});

function addMessageToChat(message, sender, recipe = null) {
  const chatMessages = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.className =
    "chat-message flex " + (sender === "user" ? "justify-end" : "");

  const bubble = document.createElement("div");
  bubble.className =
    sender === "user"
      ? "bg-[#f72585] text-white rounded-lg p-3 max-w-3/4"
      : "bg-[#2d1b69] text-white rounded-lg p-3 max-w-3/4";

  const text = document.createElement("p");
  text.textContent = message;

  bubble.appendChild(text);
  messageDiv.appendChild(bubble);
  chatMessages.appendChild(messageDiv);

  // If this is a bot message, speak it
  if (sender === "bot") {
    speakText(message);
  }

  // If this is a bot message and there's a recipe, add a "Show Recipe" button
  if (sender === "bot" && recipe) {
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "chat-message flex mt-2";

    const button = document.createElement("button");
    button.className =
      "bg-[#f72585] text-white px-4 py-2 rounded-lg hover:bg-[#ff6b6b] text-sm transition-colors duration-200";
    button.textContent = "Show Recipe";
    button.onclick = () => {
      // Update currentMood and lastRecipeId to match the recommended recipe
      currentMood = recipe.mood;
      lastRecipeId = recipe.id;
      lastRecommendedRecipe = recipe;

      // Update UI to show the specific recipe
      displayRecipe(recipe);

      // Update active state of mood buttons
      document.querySelectorAll(".mood-btn, .nav-mood-btn").forEach((btn) => {
        if (btn.dataset.mood === currentMood) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      document.getElementById("chat-container").classList.add("hidden");
    };

    buttonDiv.appendChild(button);
    chatMessages.appendChild(buttonDiv);
  }

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
  const chatMessages = document.getElementById("chat-messages");
  const typingDiv = document.createElement("div");
  typingDiv.id = "typing-indicator";
  typingDiv.className = "chat-message flex";
  typingDiv.innerHTML = `
        <div class="bg-gray-100 rounded-lg p-3 max-w-3/4">
            <div class="flex space-x-2">
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
        </div>
    `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Function to display a specific recipe
function displayRecipe(recipe) {
  const recipeContainer = document.getElementById("recipe-container");
  const initialMessage = document.getElementById("initial-message");
  recipeContainer.style.opacity = "0";

  // Hide initial message
  initialMessage.classList.add("hidden");

  document.getElementById("recipe-name").textContent = recipe.name;
  document.getElementById("recipe-ingredients").textContent =
    recipe.ingredients;
  document.getElementById("recipe-instructions").textContent =
    recipe.instructions;

  // Show the container if it was hidden
  recipeContainer.classList.remove("hidden");

  // Preload the image
  const img = new Image();
  img.onload = () => {
    document.getElementById("recipe-image").src = recipe.image_url;
    // Fade in the content after image is loaded
    setTimeout(() => {
      recipeContainer.style.transition = "opacity 0.3s ease";
      recipeContainer.style.opacity = "1";
    }, 50);
  };
  img.onerror = () => {
    // If image fails to load, show the content anyway
    document.getElementById("recipe-image").src =
      "https://picsum.photos/500/300?blur=2";
    setTimeout(() => {
      recipeContainer.style.transition = "opacity 0.3s ease";
      recipeContainer.style.opacity = "1";
    }, 50);
  };
  img.src = recipe.image_url;
}

// Function to handle mood selection
function handleMoodSelection(mood) {
  console.log("Mood selected:", mood);
  currentMood = mood;
  lastRecipeId = null; // Reset last recipe when mood changes

  // Update active state of mood buttons
  document.querySelectorAll(".mood-btn, .nav-mood-btn").forEach((btn) => {
    if (btn.dataset.mood === mood) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  getRecipe(currentMood);
}

// Function to show welcome popup
function showWelcomePopup() {
  const chatToggle = document.getElementById("chat-toggle");
  const popupContainer = document.createElement("div");

  // Create a container that's fixed above and far to the left of the chat button
  popupContainer.style.position = "fixed";
  popupContainer.style.bottom = "80px"; // Position above the chat button
  popupContainer.style.right = "225px"; // Much further to the left
  popupContainer.style.zIndex = "1000";

  const popup = document.createElement("div");
  popup.className = "welcome-popup opacity-0 transform translate-y-2";
  popup.style.width = "200px"; // Set a fixed width for the popup
  popup.innerHTML = `
    <div class="bg-[#2d1b69] text-white p-3 rounded-lg shadow-lg relative" style="white-space: normal; word-wrap: break-word;">
      <p class="text-sm" style="line-height: 1.4;">Let me help you find the perfect recipe! 👩‍🍳</p>
      <div class="absolute w-3 h-3 bg-[#2d1b69] transform rotate-45 bottom-[-6px] right-4"></div>
    </div>
  `;

  // Add popup to the fixed container
  popupContainer.appendChild(popup);
  // Add container to the body instead of the button
  document.body.appendChild(popupContainer);

  // Trigger animation after a short delay
  setTimeout(() => {
    popup.style.transition = "all 0.5s ease";
    popup.classList.remove("opacity-0", "translate-y-2");
  }, 500);

  // Remove popup after 10 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.transform = "translateY(2px)";
    setTimeout(() => {
      popupContainer.remove();
    }, 500);
  }, 10000); // 10 seconds display time
}

// Add event listeners to both nav and main mood buttons
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, adding event listeners");

  // Show welcome popup after a short delay
  setTimeout(showWelcomePopup, 1000);

  // Set random greeting
  const greetings = [
    "Hey there, foodie friend! 👋 What's cooking?",
    "Welcome to your personal recipe matchmaker! How are you feeling today? 😊",
    "Hi! Ready to find your perfect recipe match? Tell me how you're feeling! ✨",
    "Hello! I'm here to help you find the perfect recipe for your mood! 🌟",
    "Hey! Let's find something delicious that matches your vibe today! 🎉",
  ];
  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];
  document.getElementById("initial-greeting").textContent = randomGreeting;

  // Initialize speech recognition and synthesis
  initializeSpeechRecognition();
  initializeSpeechSynthesis();

  // Add microphone button click handler
  document.getElementById("mic-button").addEventListener("click", (e) => {
    e.preventDefault();
    toggleSpeechRecognition();
  });

  const moodButtons = document.querySelectorAll(".mood-btn, .nav-mood-btn");
  console.log("Found mood buttons:", moodButtons.length);

  moodButtons.forEach((button) => {
    console.log("Adding click listener to button:", button.dataset.mood);
    button.addEventListener("click", () => {
      console.log("Button clicked:", button.dataset.mood);
      handleMoodSelection(button.dataset.mood);
    });
  });

  document.getElementById("new-recipe").addEventListener("click", async () => {
    if (currentMood) {
      const button = document.getElementById("new-recipe");
      const originalText = button.textContent;

      // Disable button and show loading state
      button.disabled = true;
      button.textContent = "Finding a new recipe...";

      const recipeContainer = document.getElementById("recipe-container");
      recipeContainer.style.opacity = "0";

      setTimeout(async () => {
        await getRecipe(currentMood);
        // Reset button state
        button.disabled = false;
        button.textContent = originalText;
      }, 300);
    }
  });

  // Add speech toggle button click handler
  document.getElementById("speak-toggle").addEventListener("click", () => {
    if (isSpeaking) {
      synth.cancel();
      isSpeaking = false;
      document.getElementById("speak-toggle").classList.remove("speaking");
    }
  });
});

async function getRecipe(mood) {
  try {
    console.log("Getting recipe for mood:", mood);

    // Show loading state
    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.style.opacity = "0";

    // Get recipes and responses for the selected mood
    try {
      const { recipeData } = await import("./data.js");
      const { moodResponses, recipeKeywords } = await import("./responses.js");
      console.log("Recipe data and responses loaded");

      const moodRecipes = recipeData[mood];
      console.log("Recipes for mood", mood, ":", moodRecipes);

      if (!moodRecipes || moodRecipes.length === 0) {
        console.log("No recipes found for mood:", mood);
        // Show a friendly message in the recipe container
        recipeContainer.classList.remove("hidden");
        document.getElementById("recipe-name").textContent = "No Recipe Found";
        document.getElementById("recipe-ingredients").textContent =
          "Sorry, I couldn't find any recipes that match your current mood. Try selecting a different mood or ask me for suggestions in the chat! 😊";
        document.getElementById("recipe-instructions").textContent = "";
        document.getElementById("recipe-image").src =
          "https://picsum.photos/500/300?blur=2";

        setTimeout(() => {
          recipeContainer.style.transition = "opacity 0.3s ease";
          recipeContainer.style.opacity = "1";
        }, 50);
        return;
      }

      // Get a random recipe that's different from the last one
      let recipe;
      if (lastRecipeId) {
        const availableRecipes = moodRecipes.filter(
          (r) => r.id !== lastRecipeId
        );
        recipe =
          availableRecipes[
            Math.floor(Math.random() * availableRecipes.length)
          ] || moodRecipes[0];
      } else {
        recipe = moodRecipes[Math.floor(Math.random() * moodRecipes.length)];
      }

      console.log("Selected recipe:", recipe);

      // Store the current recipe ID
      lastRecipeId = recipe.id;

      // Get a random response for the current mood
      const moodResponse =
        moodResponses[mood].responses[
          Math.floor(Math.random() * moodResponses[mood].responses.length)
        ];

      // Get keywords for the recipe
      const keywords = recipeKeywords[recipe.name] || [];
      const keywordText =
        keywords.length > 0 ? `\n\nKeywords: ${keywords.join(", ")}` : "";

      // Update content with mood response and keywords
      document.getElementById("recipe-name").textContent = recipe.name;
      document.getElementById("recipe-ingredients").textContent =
        moodResponse + "\n\n" + recipe.ingredients;
      document.getElementById("recipe-instructions").textContent =
        recipe.instructions + keywordText;

      // Show the container if it was hidden
      recipeContainer.classList.remove("hidden");

      // Preload the image
      const img = new Image();
      img.onload = () => {
        document.getElementById("recipe-image").src = recipe.image_url;
        // Fade in the content after image is loaded
        setTimeout(() => {
          recipeContainer.style.transition = "opacity 0.3s ease";
          recipeContainer.style.opacity = "1";
        }, 50);
      };
      img.onerror = () => {
        console.error("Failed to load image:", recipe.image_url);
        // If image fails to load, show the content anyway
        document.getElementById("recipe-image").src =
          "https://picsum.photos/500/300?blur=2";
        setTimeout(() => {
          recipeContainer.style.transition = "opacity 0.3s ease";
          recipeContainer.style.opacity = "1";
        }, 50);
      };
      img.src = recipe.image_url;
    } catch (importError) {
      console.error("Error importing recipe data:", importError);
      throw new Error("Failed to load recipe data");
    }
  } catch (error) {
    console.error("Error in getRecipe:", error);
    // Show error message in the recipe container
    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.classList.remove("hidden");
    document.getElementById("recipe-name").textContent = "Oops!";
    document.getElementById("recipe-ingredients").textContent =
      "Sorry, something went wrong while finding your recipe. Please try again or select a different mood. 😅";
    document.getElementById("recipe-instructions").textContent = "";
    document.getElementById("recipe-image").src =
      "https://picsum.photos/500/300?blur=2";

    setTimeout(() => {
      recipeContainer.style.transition = "opacity 0.3s ease";
      recipeContainer.style.opacity = "1";
    }, 50);

    // Reset button state in case of error
    const button = document.getElementById("new-recipe");
    button.disabled = false;
    button.textContent = "Get Another Recipe";
  }
}
