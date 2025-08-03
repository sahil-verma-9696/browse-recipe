import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useParams } from "react-router";
import { ChefHat } from "lucide-react";
import YoutubeEmbed from "./components/youtube-embed";
import Externallink from "./components/external-link";
import Tags from "./components/tags";
import Instructions from "./components/instructions";
import IngredientList from "./components/ingredient-list";
import Header from "./components/header";
import Banner from "./components/banner";
// import CookingTimer from "./components/cooking-timer";

// Utility function moved outside component to prevent recreation
const extractIngredients = (meal) => {
  if (!meal) return [];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
        imageUrl: `https://www.themealdb.com/images/ingredients/${ingredient
          .trim()
          .replace(/ /g, "_")}.png`,
      });
    }
  }
  return ingredients;
};

// Extract video ID utility
const extractVideoId = (youtubeUrl) => {
  if (!youtubeUrl) return null;
  return youtubeUrl.split("v=")[1]?.split("&")[0] || null;
};

export default function RecipePage() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCount = useRef(0);

  // Memoize the fetch function to prevent recreation on every render
  const fetchMeal = useCallback(async () => {
    fetchCount.current++;
    if (!mealId) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch meal data");
      }

      const data = await res.json();

      if (!data.meals || data.meals.length === 0) {
        throw new Error("Recipe not found");
      }

      setMeal(data.meals[0]);
    } catch (error) {
      console.error("Error fetching meal:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [mealId]);

  // Fetch meal data when component mounts or mealId changes
  if (fetchCount.current == 0) fetchMeal();

  // Memoize expensive calculations
  const ingredients = useMemo(() => extractIngredients(meal), [meal]);
  const youtubeVideoId = useMemo(
    () => extractVideoId(meal?.strYoutube),
    [meal?.strYoutube]
  );

  // Memoize meal data for child components
  const mealData = useMemo(() => {
    if (!meal) return null;
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      area: meal.strArea,
      category: meal.strCategory,
      thumb: meal.strMealThumb,
      instructions: meal.strInstructions,
      source: meal.strSource,
      tags: meal.strTags,
      youtube: meal.strYoutube,
    };
  }, [meal]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !mealData) {
    return <ErrorDisplay error={error} onRetry={fetchMeal} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Header strMeal={mealData.name} strArea={mealData.area} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Banner meal={meal} />

        {/* <CookingTimer /> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="lg:col-span-1">
            <IngredientsSection ingredients={ingredients} />
          </div>

          {/* Instructions Section */}
          <div className="lg:col-span-2 space-y-4">
            <Instructions strInstructions={mealData.instructions} />
            {youtubeVideoId && <YoutubeEmbed videoId={youtubeVideoId} />}
            {mealData.source && <Externallink strSource={mealData.source} />}
            {mealData.tags && <Tags strTags={mealData.tags} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate component for ingredients section
const IngredientsSection = React.memo(({ ingredients }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-8">
    <div className="flex items-center gap-3 mb-6">
      <ChefHat className="text-orange-500 w-6 h-6" />
      <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
    </div>
    <IngredientList ingredients={ingredients} />
  </div>
));

// Loading component
const LoadingSpinner = React.memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
  </div>
));

// Error component
const ErrorDisplay = React.memo(({ error, onRetry }) => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
    <div className="text-center">
      <div className="text-orange-600 text-xl mb-4">
        {error || "Recipe not found"}
      </div>
      <button
        onClick={onRetry}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
));
