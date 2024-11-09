import React, { useState } from 'react';
import { Clock, ChefHat, ExternalLink, X } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);

  const handleViewRecipe = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
      );
      const data = await response.json();
      if (data.meals?.[0]) {
        // Update recipe with full details
        Object.assign(recipe, data.meals[0]);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  return (
    <>
      <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          {recipe.strCategory && (
            <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {recipe.strCategory}
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
            {recipe.strMeal}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>30-45 min</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              <span>Medium</span>
            </div>
          </div>
          <button
            onClick={handleViewRecipe}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30"
          >
            View Recipe
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Recipe Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{recipe.strMeal}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                  <p>{recipe.strCategory || 'Not specified'}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Cuisine</h3>
                  <p>{recipe.strArea || 'Not specified'}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instructions</h3>
                <p className="text-gray-700 whitespace-pre-line">{recipe.strInstructions}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Ingredients</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const ingredient = recipe[`strIngredient${i + 1}` as keyof Recipe];
                    const measure = recipe[`strMeasure${i + 1}` as keyof Recipe];
                    if (ingredient && measure) {
                      return (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <span className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0" />
                          {measure} {ingredient}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>

              {recipe.strYoutube && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Video Tutorial</h3>
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600"
                  >
                    Watch on YouTube
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;