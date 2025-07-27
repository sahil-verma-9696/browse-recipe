import React from "react";
import Image from "../../components/image";
import { Link, useParams } from "react-router";

export default function MealCard({ mealData = {} }) {
  const { categoryName } = useParams();

  const { strMeal, strMealThumb, idMeal } = mealData;
  return (
    <div>
      <div
        key={idMeal}
        className=" border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group overflow-hidden rounded-md"
      >
        <div className="p-0">
          <div className="relative overflow-hidden">
            <div className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
              <Image src={strMealThumb} alt={strMeal} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3">
              <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                #{idMeal}
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm leading-tight group-hover:text-orange-400 transition-colors duration-200">
              {strMeal}
            </h3>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-slate-500 text-xs">{categoryName}</span>
              <Link to={`/recipe/${idMeal}`} className="text-orange-500 hover:text-orange-400 text-xs font-medium hover:underline transition-colors">
                View Recipe →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
