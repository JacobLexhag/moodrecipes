const recipeData = {
  happy: [
    {
      id: "h1",
      name: "Rainbow Fruit Salad",
      ingredients:
        "2 cups strawberries\n2 oranges\n2 bananas\n1 cup blueberries\n1 cup grapes\n2 kiwis\nHoney for drizzling\nMint leaves for garnish",
      instructions:
        "1. Wash all fruits thoroughly\n2. Cut strawberries into halves\n3. Peel and segment oranges\n4. Slice bananas\n5. Peel and slice kiwis\n6. Combine all fruits in a large bowl\n7. Drizzle with honey\n8. Garnish with mint leaves\n9. Serve immediately",
      image_url:
        "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500",
      mood: "happy",
    },
    {
      id: "h2",
      name: "Sunny Side Up Breakfast Bowl",
      ingredients:
        "2 eggs\n1 cup quinoa (cooked)\n1 avocado\nCherry tomatoes\nBaby spinach\nSalt and pepper to taste\nOlive oil",
      instructions:
        "1. Cook quinoa according to package instructions\n2. Heat olive oil in a pan\n3. Crack eggs and cook sunny side up\n4. Slice avocado and tomatoes\n5. Arrange quinoa in a bowl\n6. Top with eggs, avocado, tomatoes, and spinach\n7. Season with salt and pepper\n8. Serve hot",
      image_url:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500",
      mood: "happy",
    },
    {
      id: "h3",
      name: "Citrus Glazed Salmon",
      ingredients:
        "4 salmon fillets\n2 oranges\n1 lemon\n2 tbsp honey\n2 tbsp soy sauce\nGinger, minced\nGarlic, minced\nSalt and pepper",
      instructions:
        "1. Mix orange juice, lemon juice, honey, and soy sauce\n2. Add minced ginger and garlic to the mixture\n3. Season salmon with salt and pepper\n4. Pour glaze over salmon\n5. Bake at 400°F for 15-20 minutes\n6. Garnish with citrus slices\n7. Serve hot",
      image_url:
        "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=500",
      mood: "happy",
    },
    {
      id: "h4",
      name: "Berry Smoothie Bowl",
      ingredients:
        "1 cup mixed berries\n1 banana\n1 cup yogurt\nHoney\nGranola\nChia seeds\nCoconut flakes",
      instructions:
        "1. Blend berries, banana, and yogurt until smooth\n2. Pour into a bowl\n3. Top with granola\n4. Sprinkle chia seeds\n5. Add coconut flakes\n6. Drizzle with honey\n7. Serve immediately",
      image_url:
        "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=500",
      mood: "happy",
    },
    {
      id: "h5",
      name: "Mango Avocado Salsa",
      ingredients:
        "2 ripe mangos\n2 avocados\n1 red onion\n1 lime\nCilantro\nJalapeno (optional)\nSalt to taste",
      instructions:
        "1. Dice mangos and avocados\n2. Finely chop red onion\n3. Mince jalapeno if using\n4. Chop cilantro\n5. Combine all ingredients\n6. Squeeze lime juice over\n7. Season with salt\n8. Gently toss\n9. Serve with chips",
      image_url:
        "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=500",
      mood: "happy",
    },
  ],
  sad: [
    {
      id: "s1",
      name: "Classic Mac and Cheese",
      ingredients:
        "1 pound macaroni\n3 cups cheddar cheese\n1 cup mozzarella\n4 tbsp butter\n4 tbsp flour\n4 cups milk\nSalt and pepper\nBreadcrumbs",
      instructions:
        "1. Cook macaroni according to package\n2. Make roux with butter and flour\n3. Add milk and simmer until thickened\n4. Add cheeses and stir until melted\n5. Mix with macaroni\n6. Top with breadcrumbs\n7. Bake until golden\n8. Serve hot",
      image_url:
        "https://images.unsplash.com/photo-1612152328957-e06e1d0c4e27?w=500",
      mood: "sad",
    },
    {
      id: "s2",
      name: "Homemade Chicken Soup",
      ingredients:
        "Whole chicken\nCarrots\nCelery\nOnion\nGarlic\nNoodles\nFresh herbs\nSalt and pepper",
      instructions:
        "1. Simmer chicken with vegetables\n2. Remove chicken and shred\n3. Strain broth\n4. Cook noodles in broth\n5. Add chicken back\n6. Season to taste\n7. Add fresh herbs\n8. Serve hot",
      image_url:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500",
      mood: "sad",
    },
    {
      id: "s3",
      name: "Chocolate Chip Cookies",
      ingredients:
        "2 1/4 cups flour\n1 cup butter\n3/4 cup sugar\n3/4 cup brown sugar\n2 eggs\nVanilla extract\nChocolate chips\nSalt",
      instructions:
        "1. Cream butter and sugars\n2. Add eggs and vanilla\n3. Mix in dry ingredients\n4. Fold in chocolate chips\n5. Drop onto baking sheet\n6. Bake at 375°F\n7. Cool slightly\n8. Enjoy warm",
      image_url:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500",
      mood: "sad",
    },
    {
      id: "s4",
      name: "Creamy Mashed Potatoes",
      ingredients:
        "4 large potatoes\n1/2 cup milk\n1/4 cup butter\nSour cream\nSalt and pepper\nChives for garnish",
      instructions:
        "1. Peel and cut potatoes\n2. Boil until tender\n3. Drain well\n4. Add butter and milk\n5. Mash until smooth\n6. Stir in sour cream\n7. Season to taste\n8. Garnish with chives",
      image_url:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500",
      mood: "sad",
    },
    {
      id: "s5",
      name: "Beef Stew",
      ingredients:
        "2 lbs beef chuck\nPotatoes\nCarrots\nOnions\nGarlic\nBeef broth\nRed wine\nHerbs",
      instructions:
        "1. Brown beef chunks\n2. Sauté vegetables\n3. Add broth and wine\n4. Simmer with herbs\n5. Cook until tender\n6. Season to taste\n7. Serve hot",
      image_url:
        "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=500",
      mood: "sad",
    },
  ],
  excited: [
    {
      id: "e1",
      name: "Spicy Tacos",
      ingredients:
        "Ground beef\nTaco seasoning\nTortillas\nLettuce\nTomatoes\nCheese\nSour cream\nHot sauce",
      instructions:
        "1. Brown the beef\n2. Add taco seasoning\n3. Warm tortillas\n4. Assemble tacos\n5. Add toppings\n6. Serve with hot sauce",
      image_url:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
      mood: "excited",
    },
    {
      id: "e2",
      name: "Sushi Roll Platter",
      ingredients:
        "Sushi rice\nNori sheets\nSalmon\nTuna\nAvocado\nCucumber\nSoy sauce\nWasabi",
      instructions:
        "1. Prepare sushi rice\n2. Layer nori with rice\n3. Add fillings\n4. Roll tightly\n5. Slice rolls\n6. Arrange on platter\n7. Serve with condiments",
      image_url:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
      mood: "excited",
    },
    {
      id: "e3",
      name: "Thai Red Curry",
      ingredients:
        "Chicken\nRed curry paste\nCoconut milk\nBamboo shoots\nBell peppers\nBasil\nFish sauce\nRice",
      instructions:
        "1. Sauté curry paste\n2. Add coconut milk\n3. Cook chicken\n4. Add vegetables\n5. Simmer until done\n6. Season with fish sauce\n7. Serve with rice",
      image_url:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500",
      mood: "excited",
    },
    {
      id: "e4",
      name: "Grilled Pizza",
      ingredients:
        "Pizza dough\nTomato sauce\nMozzarella\nToppings of choice\nOlive oil\nItalian herbs",
      instructions:
        "1. Heat grill\n2. Roll out dough\n3. Grill one side\n4. Flip and add toppings\n5. Close grill\n6. Cook until cheese melts\n7. Slice and serve",
      image_url:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      mood: "excited",
    },
    {
      id: "e5",
      name: "Korean BBQ Bowl",
      ingredients:
        "Beef bulgogi\nRice\nKimchi\nVegetables\nGochujang\nSesame oil\nSeaweed",
      instructions:
        "1. Marinate beef\n2. Cook rice\n3. Grill beef\n4. Prepare vegetables\n5. Assemble bowls\n6. Add sauce\n7. Garnish and serve",
      image_url:
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500",
      mood: "excited",
    },
  ],
  tired: [
    {
      id: "t1",
      name: "5-Minute Microwave Quiche",
      ingredients:
        "2 eggs\nMilk\nCheese\nSpinach\nHam (optional)\nSalt and pepper",
      instructions:
        "1. Beat eggs and milk\n2. Add fillings\n3. Microwave 3 minutes\n4. Let stand 1 minute\n5. Serve hot",
      image_url:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
      mood: "tired",
    },
    {
      id: "t2",
      name: "One-Pan Pasta",
      ingredients:
        "Pasta\nCherry tomatoes\nBasil\nGarlic\nOlive oil\nParmesan\nWater",
      instructions:
        "1. Combine all in pan\n2. Bring to boil\n3. Cook 9 minutes\n4. Stir occasionally\n5. Season and serve",
      image_url:
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500",
      mood: "tired",
    },
    {
      id: "t3",
      name: "15-Minute Stir Fry",
      ingredients:
        "Pre-cut vegetables\nProtein of choice\nStir fry sauce\nRice\nOil\nGarlic",
      instructions:
        "1. Heat oil\n2. Cook protein\n3. Add vegetables\n4. Pour sauce\n5. Serve over rice",
      image_url:
        "https://images.unsplash.com/photo-1512058556646-c4da40fba323?w=500",
      mood: "tired",
    },
    {
      id: "t4",
      name: "No-Bake Energy Bites",
      ingredients: "Oats\nPeanut butter\nHoney\nChocolate chips\nFlax seeds",
      instructions:
        "1. Mix ingredients\n2. Roll into balls\n3. Chill 30 minutes\n4. Store or serve",
      image_url:
        "https://images.unsplash.com/photo-1490567674331-72de84794694?w=500",
      mood: "tired",
    },
    {
      id: "t5",
      name: "3-Ingredient Pancakes",
      ingredients: "1 banana\n2 eggs\nCinnamon\nMaple syrup (optional)",
      instructions:
        "1. Mash banana\n2. Mix with eggs\n3. Add cinnamon\n4. Cook in pan\n5. Serve with syrup",
      image_url:
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500",
      mood: "tired",
    },
  ],
  romantic: [
    {
      id: "r1",
      name: "Chocolate Covered Strawberries",
      ingredients:
        "Fresh strawberries\nDark chocolate\nWhite chocolate\nSprinkles (optional)",
      instructions:
        "1. Wash and dry strawberries\n2. Melt dark chocolate\n3. Dip strawberries\n4. Drizzle white chocolate\n5. Add sprinkles\n6. Chill until set",
      image_url:
        "https://images.unsplash.com/photo-1532939624-3af1308db9a5?w=500",
      mood: "romantic",
    },
    {
      id: "r2",
      name: "Red Wine Braised Short Ribs",
      ingredients:
        "Beef short ribs\nRed wine\nOnions\nCarrots\nGarlic\nFresh herbs\nBeef broth",
      instructions:
        "1. Sear short ribs\n2. Sauté vegetables\n3. Add wine and broth\n4. Braise 2-3 hours\n5. Reduce sauce\n6. Serve with mashed potatoes",
      image_url:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=500",
      mood: "romantic",
    },
    {
      id: "r3",
      name: "Heart-Shaped Ravioli",
      ingredients: "Pasta dough\nRicotta\nSpinach\nParmesan\nEgg\nTomato sauce",
      instructions:
        "1. Make pasta dough\n2. Mix filling\n3. Shape hearts\n4. Cook in water\n5. Serve with sauce",
      image_url:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
      mood: "romantic",
    },
    {
      id: "r4",
      name: "Molten Chocolate Lava Cakes",
      ingredients: "Dark chocolate\nButter\nEggs\nSugar\nFlour\nVanilla\nSalt",
      instructions:
        "1. Melt chocolate and butter\n2. Mix ingredients\n3. Pour into ramekins\n4. Bake 12 minutes\n5. Serve immediately",
      image_url:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
      mood: "romantic",
    },
    {
      id: "r5",
      name: "Champagne Risotto",
      ingredients:
        "Arborio rice\nChampagne\nShallots\nParmesan\nButter\nAsparagus\nStock",
      instructions:
        "1. Sauté shallots\n2. Toast rice\n3. Add champagne\n4. Gradually add stock\n5. Finish with butter\n6. Garnish and serve",
      image_url:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500",
      mood: "romantic",
    },
  ],
  healthy: [
    {
      id: "hl1",
      name: "Quinoa Buddha Bowl",
      ingredients:
        "Quinoa\nRoasted vegetables\nChickpeas\nAvocado\nKale\nTahini dressing",
      instructions:
        "1. Cook quinoa\n2. Roast vegetables\n3. Massage kale\n4. Arrange in bowl\n5. Add dressing\n6. Top with seeds",
      image_url:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
      mood: "healthy",
    },
    {
      id: "hl2",
      name: "Green Detox Smoothie",
      ingredients:
        "Spinach\nKale\nGreen apple\nCelery\nGinger\nLemon\nCoconut water",
      instructions:
        "1. Wash produce\n2. Blend all ingredients\n3. Adjust thickness\n4. Serve immediately",
      image_url:
        "https://images.unsplash.com/photo-1556881286-fc6915169721?w=500",
      mood: "healthy",
    },
    {
      id: "hl3",
      name: "Grilled Chicken Salad",
      ingredients:
        "Chicken breast\nMixed greens\nQuinoa\nAvocado\nTomatoes\nCucumber\nLemon dressing",
      instructions:
        "1. Grill chicken\n2. Cook quinoa\n3. Chop vegetables\n4. Assemble salad\n5. Add dressing\n6. Serve fresh",
      image_url:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      mood: "healthy",
    },
    {
      id: "hl4",
      name: "Baked Salmon with Vegetables",
      ingredients:
        "Salmon fillet\nAsparagus\nBroccoli\nLemon\nGarlic\nOlive oil\nHerbs",
      instructions:
        "1. Preheat oven\n2. Season salmon\n3. Prepare vegetables\n4. Bake together\n5. Garnish with lemon",
      image_url:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
      mood: "healthy",
    },
    {
      id: "hl5",
      name: "Mediterranean Chickpea Bowl",
      ingredients:
        "Chickpeas\nCucumber\nTomatoes\nOlives\nFeta\nRed onion\nOlive oil",
      instructions:
        "1. Rinse chickpeas\n2. Chop vegetables\n3. Mix ingredients\n4. Add dressing\n5. Top with feta",
      image_url:
        "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=500",
      mood: "healthy",
    },
  ],
};

export { recipeData };
