import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import { Clock, Users, ChefHat, Youtube, ExternalLink } from "lucide-react";
import Image from "../../components/image";

export default function RecipePage() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState({});
  const [loading, setLoading] = useState(true);

  const countRef = useRef(0);

  async function fetchMeal() {
    countRef.current++;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await res.json();
      console.log(data.meals[0]);
      setMeal(data.meals[0]);
    } catch (error) {
      console.error("Error fetching meal:", error);
    } finally {
      setLoading(false);
    }
  }

  if (countRef.current === 0) {
    fetchMeal();
  }

  // Extract ingredients and measurements
  const getIngredients = () => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ""
        });
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!meal || !meal.strMeal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-orange-600 text-xl">Recipe not found</div>
      </div>
    );
  }

  const ingredients = getIngredients();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{meal.strMeal}</h1>
              <div className="flex items-center gap-4 text-sm md:text-base">
                <span className="bg-orange-500 px-3 py-1 rounded-full font-medium">
                  {meal.strCategory}
                </span>
                <span className="bg-orange-600 px-3 py-1 rounded-full font-medium">
                  {meal.strArea} Cuisine
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <ChefHat className="text-orange-500 w-6 h-6" />
                <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
              </div>
              <div className="space-y-3">
                {ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500"
                  >
                    <span className="font-medium text-gray-700">{item.ingredient}</span>
                    <span className="text-orange-600 font-semibold">{item.measure}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Clock className="text-orange-500 w-6 h-6" />
                Instructions
              </h2>
              <div className="prose prose-orange max-w-none">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border-l-4 border-orange-500">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {meal.strInstructions}
                  </p>
                </div>
              </div>
            </div>

            {/* Video and Source Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Youtube className="w-6 h-6" />
                  <span className="font-semibold">Watch Video</span>
                </a>
              )}
              
              {meal.strSource && (
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <ExternalLink className="w-6 h-6" />
                  <span className="font-semibold">Original Recipe</span>
                </a>
              )}
            </div>

            {/* Tags Section */}
            {meal.strTags && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {meal.strTags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}