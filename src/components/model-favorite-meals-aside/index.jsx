import React, { memo, useCallback, useState, useEffect } from "react";
import { X, Heart, Trash2 } from "lucide-react";
import { useGlobalContext } from "../../context/GlobalState";
import Image from "../image";
import { Link } from "react-router";

const FavoriteMealsAsideModel = memo((props) => {
  const { close } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { favorites, setFavorites } = useGlobalContext();

  // Handle animations
  useEffect(() => {
    // Trigger enter animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsVisible(false);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      close();
    }, 300);
  }, [close]);

  const removeFavorite = useCallback(
    (mealId) => {
      setFavorites((prev) => prev.filter((meal) => meal.idMeal !== mealId));
    },
    [setFavorites]
  );

  return (
    <>
      {/* Backdrop with fade animation */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-out ${
          isVisible ? "opacity-40" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Aside Panel with slide animation */}
      <div
        className={`fixed top-0 right-0 w-[50vw] h-full bg-gradient-to-b from-orange-50 to-orange-100 shadow-2xl z-50 border-l-4 border-orange-400 transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with fade-in animation */}
        <div
          className={`bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 shadow-lg transform transition-all duration-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart
                className={`w-6 h-6 text-orange-200 transform transition-all duration-700 ease-out ${
                  isVisible ? "scale-100 rotate-0" : "scale-0 rotate-45"
                }`}
              />
              <h2
                className={`text-2xl font-bold transform transition-all duration-500 delay-100 ease-out ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
              >
                Favorite Meals
              </h2>
              <span
                className={`bg-orange-700 text-orange-100 px-3 py-1 rounded-full text-sm font-semibold transform transition-all duration-500 delay-200 ease-out ${
                  isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                {favorites.length}
              </span>
            </div>
            <button
              onClick={handleClose}
              className={`p-2 hover:bg-orange-700 rounded-full transition-all duration-200 transform ${
                isVisible ? "scale-100 rotate-0" : "scale-0 rotate-90"
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content with staggered animation */}
        <div
          className={`p-6 h-[calc(100vh-120px)] overflow-y-auto transform transition-all duration-500 delay-200 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {favorites.length === 0 ? (
            <div
              className={`flex flex-col items-center justify-center h-full text-orange-600 transform transition-all duration-700 delay-300 ease-out ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <Heart
                className={`w-16 h-16 text-orange-300 mb-4 transform transition-all duration-1000 delay-400 ease-out ${
                  isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
                }`}
              />
              <p
                className={`text-xl font-semibold mb-2 transform transition-all duration-500 delay-500 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                No favorites yet!
              </p>
              <p
                className={`text-orange-500 transform transition-all duration-500 delay-600 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                Start adding meals to your favorites
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((meal, index) => (
                <div
                  key={meal.idMeal}
                  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-orange-200 transform ${
                    isVisible
                      ? "translate-x-0 opacity-100 scale-100"
                      : "translate-x-8 opacity-0 scale-95"
                  }`}
                  style={{
                    transitionDelay: isVisible
                      ? `${300 + index * 100}ms`
                      : "0ms",
                    transitionDuration: "500ms",
                  }}
                >
                  <div className="flex gap-4 p-4">
                    {/* Meal Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className={`w-20 h-20 object-cover rounded-lg border-2 border-orange-200 transform transition-all duration-500 ${
                          isVisible ? "scale-100 rotate-0" : "scale-0 rotate-12"
                        }`}
                        style={{
                          transitionDelay: isVisible
                            ? `${400 + index * 100}ms`
                            : "0ms",
                        }}
                      />
                    </div>

                    {/* Meal Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/recipe/${meal.idMeal}`}
                        className={`text-lg font-bold text-gray-800 truncate mb-1 transform transition-all duration-500 ${
                          isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isVisible
                            ? `${450 + index * 100}ms`
                            : "0ms",
                        }}
                      >
                        {meal.strMeal}
                      </Link>
                      <div
                        className={`flex gap-3 mb-2 transform transition-all duration-500 ${
                          isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isVisible
                            ? `${500 + index * 100}ms`
                            : "0ms",
                        }}
                      >
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-medium">
                          {meal.strCategory}
                        </span>
                        <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-md text-xs font-medium">
                          {meal.strArea}
                        </span>
                      </div>
                      <p
                        className={`text-gray-600 text-sm transform transition-all duration-500 ${
                          isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isVisible
                            ? `${550 + index * 100}ms`
                            : "0ms",
                        }}
                      >
                        Main ingredients: {meal.strIngredient1},{" "}
                        {meal.strIngredient2}, {meal.strIngredient3}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => removeFavorite(meal.idMeal)}
                        className={`p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-300 group transform hover:scale-110 ${
                          isVisible
                            ? "scale-100 rotate-0 opacity-100"
                            : "scale-0 rotate-45 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isVisible
                            ? `${600 + index * 100}ms`
                            : "0ms",
                        }}
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

FavoriteMealsAsideModel.displayName = "FavoriteMealsAsideModel";

export default FavoriteMealsAsideModel;
