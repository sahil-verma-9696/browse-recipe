import React, { memo, useMemo, useCallback } from "react";
import Image from "../../../components/image";
import { Heart } from "lucide-react";
import { useGlobalContext } from "../../../context/GlobalState";

const Banner = memo((props) => {
  const { meal } = props;
  const { favorites, setFavorites } = useGlobalContext();

  // Memoize the favorite status calculation
  const isFavorite = useMemo(() => {
    return favorites.some((fav) => fav.idMeal === meal.idMeal);
  }, [favorites, meal.idMeal]);

  // Memoize the favorite toggle handler
  const handleFavoriteClick = useCallback(() => {
    setFavorites((prev) => {
      const existingIndex = prev.findIndex((fav) => fav.idMeal === meal.idMeal);

      if (existingIndex !== -1) {
        // Remove from favorites
        return prev.filter((_, index) => index !== existingIndex);
      } else {
        // Add to favorites
        return [...prev, meal];
      }
    });
  }, [meal, setFavorites]);

  // Memoize meal properties to prevent accessing them multiple times
  const mealData = useMemo(
    () => ({
      id: meal.idMeal,
      name: meal.strMeal,
      thumb: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
    }),
    [meal]
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
      <div className="relative">
        <Image
          src={mealData.thumb}
          alt={mealData.name}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            isFavorite
              ? "bg-red-500 text-white shadow-lg"
              : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            {mealData.name}
          </h1>
          <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="bg-orange-500 px-3 py-1 rounded-full font-medium">
              {mealData.category}
            </span>
            <span className="bg-orange-600 px-3 py-1 rounded-full font-medium">
              {mealData.area} Cuisine
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

// Add display name for better debugging
Banner.displayName = "Banner";

export default Banner;
