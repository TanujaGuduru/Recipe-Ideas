import React, { useState, useEffect } from 'react';
import { Search, Loader2, UtensilsCrossed } from 'lucide-react';
import RecipeCard from './components/RecipeCard';
import Hero from './components/Hero';
import { Recipe } from './types';

function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [randomMeals, setRandomMeals] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRandomMeals = async () => {
      const meals: Recipe[] = [];
      try {
        for (let i = 0; i < 6; i++) {
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
          const data = await response.json();
          if (data.meals?.[0]) {
            meals.push(data.meals[0]);
          }
        }
        setRandomMeals(meals);
      } catch (error) {
        console.error('Error fetching random meals:', error);
      }
    };

    fetchRandomMeals();
  }, []);

  const searchRecipes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredient.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UtensilsCrossed className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-800">QuickChef</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={searchRecipes} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  placeholder="Enter an ingredient (e.g., chicken, tomatoes)"
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2 shadow-lg shadow-orange-500/30"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Search Recipes'
                )}
              </button>
            </form>
          </div>

          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 mt-16 text-center">
                Featured Recipes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {randomMeals.map((meal) => (
                  <RecipeCard key={meal.idMeal} recipe={meal} />
                ))}
              </div>
            </>
          )}

          {recipes.length === 0 && !loading && ingredient && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No recipes found for "{ingredient}". Try another ingredient!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;