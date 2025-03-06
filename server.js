import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { getRandomResponse } from "./public/responses.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.get("/recipes", (req, res) => {
  res.sendFile(join(__dirname, "public", "recipes.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(join(__dirname, "public", "contact.html"));
});

app.get("/recipe.html", (req, res) => {
  res.sendFile(join(__dirname, "public", "recipe.html"));
});

// Database setup
const db = new sqlite3.Database("recipes.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
    return;
  }
  console.log("Connected to the recipes database.");

  // Create tables and insert data
  initializeDatabase();
});

function initializeDatabase() {
  db.serialize(() => {
    // Drop existing table to start fresh
    db.run("DROP TABLE IF EXISTS recipes", (err) => {
      if (err) {
        console.error("Error dropping table:", err.message);
        return;
      }
      console.log("Dropped existing recipes table");
    });

    // Create new table
    db.run(
      `CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            ingredients TEXT NOT NULL,
            instructions TEXT NOT NULL,
            mood TEXT NOT NULL,
            image_url TEXT NOT NULL
        )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
          return;
        }
        console.log("Created recipes table");
      }
    );

    // Insert sample data
    const sampleRecipes = [
      // Happy Recipes
      {
        name: "Rainbow Fruit Salad",
        ingredients:
          "Strawberries, Oranges, Pineapple, Blueberries, Grapes, Honey, Mint leaves",
        instructions:
          "1. Wash and cut all fruits into bite-sized pieces\n2. Mix in a large bowl\n3. Drizzle with honey\n4. Garnish with mint leaves\n5. Chill before serving",
        mood: "happy",
        image_url:
          "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500",
      },
      {
        name: "Colorful Buddha Bowl",
        ingredients:
          "Quinoa, Sweet potato, Chickpeas, Avocado, Cherry tomatoes, Kale, Tahini dressing",
        instructions:
          "1. Cook quinoa\n2. Roast sweet potato and chickpeas\n3. Prepare fresh vegetables\n4. Assemble in a bowl\n5. Drizzle with tahini dressing",
        mood: "happy",
        image_url:
          "https://images.unsplash.com/photo-1546007600-8c2e5a9b8ea8?w=500",
      },
      {
        name: "Sunshine Breakfast Smoothie",
        ingredients:
          "Mango, Pineapple, Orange juice, Greek yogurt, Turmeric, Honey",
        instructions:
          "1. Combine all ingredients in a blender\n2. Blend until smooth\n3. Serve immediately",
        mood: "happy",
        image_url:
          "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
      },
      // Sad Recipes
      {
        name: "Comforting Mac and Cheese",
        ingredients:
          "Macaroni, Cheddar cheese, Gruyere cheese, Milk, Butter, Flour, Breadcrumbs",
        instructions:
          "1. Cook macaroni\n2. Make cheese sauce with butter, flour, and milk\n3. Add both cheeses\n4. Combine with pasta\n5. Top with breadcrumbs and bake",
        mood: "sad",
        image_url:
          "https://images.unsplash.com/photo-1612152328957-e06e1d0c4e27?w=500",
      },
      {
        name: "Warm Chocolate Chip Cookies",
        ingredients:
          "Butter, Brown sugar, White sugar, Eggs, Vanilla, Flour, Chocolate chips",
        instructions:
          "1. Cream butter and sugars\n2. Add eggs and vanilla\n3. Mix in dry ingredients\n4. Add chocolate chips\n5. Bake until golden",
        mood: "sad",
        image_url:
          "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500",
      },
      {
        name: "Creamy Tomato Soup",
        ingredients:
          "Tomatoes, Heavy cream, Onion, Garlic, Vegetable broth, Basil, Butter",
        instructions:
          "1. Sauté onion and garlic\n2. Add tomatoes and broth\n3. Simmer and blend\n4. Stir in cream\n5. Garnish with basil",
        mood: "sad",
        image_url:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500",
      },
      // Excited Recipes
      {
        name: "Spicy Tacos",
        ingredients:
          "Ground beef, Taco seasoning, Lettuce, Tomatoes, Cheese, Hot sauce, Lime",
        instructions:
          "1. Cook seasoned beef\n2. Warm tortillas\n3. Assemble with toppings\n4. Add hot sauce to taste\n5. Squeeze lime over top",
        mood: "excited",
        image_url:
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
      },
      {
        name: "Zesty Lemon Shrimp Pasta",
        ingredients:
          "Shrimp, Linguine, Garlic, Lemon, White wine, Red pepper flakes, Parsley",
        instructions:
          "1. Cook pasta\n2. Sauté shrimp and garlic\n3. Add wine and lemon\n4. Toss with pasta\n5. Garnish with parsley",
        mood: "excited",
        image_url:
          "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500",
      },
      {
        name: "Spicy Korean BBQ Wings",
        ingredients:
          "Chicken wings, Gochujang, Soy sauce, Honey, Garlic, Ginger, Sesame seeds",
        instructions:
          "1. Marinate wings\n2. Bake until crispy\n3. Toss in sauce\n4. Garnish with sesame seeds\n5. Serve hot",
        mood: "excited",
        image_url:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500",
      },
      // Tired Recipes
      {
        name: "One-Pot Chicken Rice",
        ingredients:
          "Chicken thighs, Rice, Carrots, Onion, Chicken broth, Thyme, Butter",
        instructions:
          "1. Brown chicken\n2. Add vegetables\n3. Add rice and broth\n4. Simmer until done\n5. Let rest before serving",
        mood: "tired",
        image_url:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500",
      },
      {
        name: "5-Minute Microwave Quiche",
        ingredients: "Eggs, Milk, Cheese, Spinach, Ham, Salt, Pepper",
        instructions:
          "1. Mix all ingredients\n2. Pour into mug\n3. Microwave 3 minutes\n4. Let cool slightly\n5. Enjoy!",
        mood: "tired",
        image_url:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
      },
      {
        name: "Easy Overnight Oats",
        ingredients: "Oats, Milk, Yogurt, Chia seeds, Honey, Berries, Nuts",
        instructions:
          "1. Mix oats, milk, yogurt\n2. Add chia and honey\n3. Refrigerate overnight\n4. Top with berries\n5. Add nuts before eating",
        mood: "tired",
        image_url:
          "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500",
      },
    ];

    const stmt = db.prepare(
      "INSERT INTO recipes (name, ingredients, instructions, mood, image_url) VALUES (?, ?, ?, ?, ?)"
    );
    sampleRecipes.forEach((recipe) => {
      stmt.run(
        recipe.name,
        recipe.ingredients,
        recipe.instructions,
        recipe.mood,
        recipe.image_url,
        (err) => {
          if (err) {
            console.error("Error inserting recipe:", recipe.name, err.message);
          }
        }
      );
    });
    stmt.finalize();
    console.log("Inserted sample recipes");

    // Verify data was inserted
    db.all(
      "SELECT mood, COUNT(*) as count FROM recipes GROUP BY mood",
      [],
      (err, rows) => {
        if (err) {
          console.error("Error counting recipes:", err.message);
          return;
        }
        console.log("Recipe counts by mood:", rows);
      }
    );
  });
}

// Helper function to analyze text and determine mood
function analyzeMood(text) {
  text = text.toLowerCase();

  const moodKeywords = {
    happy: [
      // Mood-based keywords
      "happy",
      "joy",
      "excited",
      "cheerful",
      "great",
      "wonderful",
      "energetic",
      "positive",
      "good",
      "fantastic",
      // Food-based keywords
      "fresh",
      "healthy",
      "colorful",
      "light",
      "vibrant",
      "fruity",
      "salad",
      "smoothie",
      "juice",
      "bright",
      "refreshing",
      "energizing",
      "nutritious",
      "rainbow",
      "garden",
      "spring",
      "summer",
      "mediterranean",
    ],
    sad: [
      // Mood-based keywords
      "sad",
      "down",
      "blue",
      "depressed",
      "unhappy",
      "comfort",
      "lonely",
      "gloomy",
      "bad",
      "rough",
      // Food-based keywords
      "chocolate",
      "sweet",
      "creamy",
      "warm",
      "comfort food",
      "mac and cheese",
      "cookies",
      "ice cream",
      "pasta",
      "cheese",
      "rich",
      "indulgent",
      "hearty",
      "soup",
      "baked",
      "melted",
      "cozy",
      "homestyle",
    ],
    excited: [
      // Mood-based keywords
      "excited",
      "energetic",
      "party",
      "celebration",
      "adventurous",
      "fun",
      "thrilled",
      "amazing",
      "festive",
      // Food-based keywords
      "spicy",
      "hot",
      "zesty",
      "tangy",
      "bold",
      "flavorful",
      "exotic",
      "fusion",
      "bbq",
      "grilled",
      "mexican",
      "thai",
      "indian",
      "korean",
      "sizzling",
      "crispy",
      "crunchy",
      "party food",
      "appetizers",
    ],
    tired: [
      // Mood-based keywords
      "tired",
      "exhausted",
      "sleepy",
      "lazy",
      "relaxed",
      "calm",
      "peaceful",
      "quiet",
      "mellow",
      // Food-based keywords
      "quick",
      "easy",
      "simple",
      "convenient",
      "microwave",
      "one-pot",
      "minimal",
      "instant",
      "ready-made",
      "slow cooker",
      "meal prep",
      "leftovers",
      "no-cook",
      "5-minute",
      "breakfast",
      "overnight",
      "comforting",
    ],
  };

  let moodScores = {
    happy: 0,
    sad: 0,
    excited: 0,
    tired: 0,
  };

  // Calculate mood scores based on keyword matches
  Object.keys(moodKeywords).forEach((mood) => {
    moodKeywords[mood].forEach((keyword) => {
      if (text.includes(keyword)) {
        moodScores[mood]++;
      }
    });
  });

  // Find the mood with the highest score
  let detectedMood = Object.entries(moodScores).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  return detectedMood;
}

// Chat endpoint
app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  const detectedMood = analyzeMood(userMessage);

  // Get a random recipe for the detected mood
  db.get(
    "SELECT * FROM recipes WHERE mood = ? ORDER BY RANDOM() LIMIT 1",
    [detectedMood],
    (err, recipe) => {
      if (err) {
        console.error("Error fetching recipe:", err.message);
        return res.status(500).json({
          message: getRandomResponse("error"),
          error: err.message,
        });
      }

      if (!recipe) {
        return res.json({
          message: `I couldn't find a specific recipe for your mood, but you might want to try something ${detectedMood}! Want to try a different mood?`,
        });
      }

      const response = {
        message: getRandomResponse(detectedMood, recipe.name),
        recipe: recipe,
        mood: detectedMood,
      };

      res.json(response);
    }
  );
});

// API Endpoints
app.get("/api/recipe/:mood", (req, res) => {
  const mood = req.params.mood;
  const lastId = req.query.lastId;

  let query = "SELECT * FROM recipes WHERE mood = ?";
  let params = [mood];

  if (lastId) {
    query += " AND id != ?";
    params.push(lastId);
  }

  query += " ORDER BY RANDOM() LIMIT 1";

  console.log("Executing query:", query, "with params:", params);

  db.get(query, params, (err, row) => {
    if (err) {
      console.error("Error fetching recipe:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Found recipe:", row);
    res.json(row || { message: "No recipe found for this mood" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
