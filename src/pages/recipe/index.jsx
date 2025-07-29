import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Clock, Users, ChefHat, Youtube, ExternalLink, Heart, Timer, Play, Pause, RotateCcw, Check } from "lucide-react";

export default function RecipePage() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(30);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());

  const countRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Check if recipe is in favorites (using localStorage simulation with state)
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(mealId));
  }, [mealId]);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsTimerActive(false);
            // Timer finished - could add notification sound here
            alert("Timer finished! Your recipe should be ready! 🍽️");
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isTimerActive, timeLeft]);

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
          measure: measure ? measure.trim() : "",
          imageUrl: `https://www.themealdb.com/images/ingredients/${ingredient.trim().replace(/ /g, '_')}.png`
        });
      }
    }
    return ingredients;
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== mealId);
    } else {
      newFavorites = [...favorites, mealId];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const startTimer = () => {
    const totalSeconds = timerMinutes * 60 + timerSeconds;
    setTimeLeft(totalSeconds);
    setIsTimerActive(true);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleIngredientCheck = (index) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
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
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isFavorite 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

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

        {/* Cooking Timer Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Timer className="text-orange-500 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-800">Cooking Timer</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Timer Display */}
            <div className="flex-1">
              {timeLeft > 0 ? (
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-orange-600 mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={isTimerActive ? pauseTimer : () => setIsTimerActive(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      {isTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isTimerActive ? 'Pause' : 'Resume'}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={timerMinutes}
                        onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Seconds</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={timerSeconds}
                        onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={startTimer}
                    disabled={timerMinutes === 0 && timerSeconds === 0}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Start Timer
                  </button>
                </div>
              )}
            </div>

            {/* Quick Timer Buttons */}
            <div className="flex flex-wrap gap-2">
              {[5, 10, 15, 30, 45, 60].map(minutes => (
                <button
                  key={minutes}
                  onClick={() => {
                    setTimerMinutes(minutes);
                    setTimerSeconds(0);
                    setTimeLeft(minutes * 60);
                    setIsTimerActive(true);
                  }}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  {minutes}m
                </button>
              ))}
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
                    className={`flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500 transition-opacity ${
                      checkedIngredients.has(index) ? 'opacity-60' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleIngredientCheck(index)}
                      className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        checkedIngredients.has(index)
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-orange-500'
                      }`}
                    >
                      {checkedIngredients.has(index) && <Check className="w-4 h-4" />}
                    </button>
                    
                    <img
                      src={item.imageUrl}
                      alt={item.ingredient}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-gray-700 ${checkedIngredients.has(index) ? 'line-through' : ''}`}>
                        {item.ingredient}
                      </div>
                      <div className="text-orange-600 font-semibold text-sm">{item.measure}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-600 text-center">
                {checkedIngredients.size} of {ingredients.length} ingredients ready
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