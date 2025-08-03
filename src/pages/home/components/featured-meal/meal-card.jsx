import React from "react";
import { ImImage, ImLocation, ImPriceTags } from "react-icons/im";
import { MdRestaurant } from "react-icons/md";
import Image from "../../../../components/image";
import Text from "../../../../components/text";
import { Link } from "react-router";

export default function MealCard({ meal = {}, isLoading }) {
  const { idMeal,strMeal, strCategory, strArea, strMealThumb, strTags } = meal;

  if (isLoading) {
    return (
      <div className="group relative w-80 h-96 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="animate-pulse">
          {/* Animated shimmer effect */}
          <div className="h-50 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex justify-center items-center">
            {/* Loading icon with pulse animation */}
            <ImImage
              size={48}
              className={`text-gray-400 transition-all duration-1000`}
            />
          </div>

          {/* Content skeleton */}
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-4/5 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 animate-pulse"></div>
            </div>

            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
              <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tags = strTags ? strTags.split(",").filter((tag) => tag.trim()) : [];

  return (
    <Link to={`recipe/${idMeal}`}>
      <div className="group relative w-80 h-96 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 cursor-pointer transform hover:-translate-y-2">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>

        {/* Image container with overlay effects */}
        <div className="relative h-48 overflow-hidden">
          <Image
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            src={strMealThumb || "/api/placeholder/320/192"}
            alt={strMeal || "Loading meal"}
          />

          {/* Floating category badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg">
              <MdRestaurant size={12} className="text-orange-500" />
              {strCategory}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 h-48 flex flex-col justify-between relative z-10">
          {/* Main content */}
          <div className="space-y-3">
            <Text className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
              {strMeal}
            </Text>

            {/* Location with icon */}
            <div className="flex items-center gap-2 text-gray-600">
              <ImLocation size={14} className="text-orange-500 flex-shrink-0" />
              <Text className="text-sm font-medium">{strArea}</Text>
            </div>
          </div>

          {/* Tags section */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
              <ImPriceTags
                size={12}
                className="text-gray-400 mt-1 flex-shrink-0"
              />
              <div className="flex flex-wrap gap-1 flex-1">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs font-medium bg-orange-50 text-orange-600 rounded-full border border-orange-100 hover:bg-orange-100 transition-colors duration-200"
                  >
                    {tag.trim()}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="inline-block px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-orange-400/10 blur-xl"></div>
        </div>
      </div>
    </Link>
  );
}
