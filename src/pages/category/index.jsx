import React, { useRef, useState } from "react";
import { FiShield } from "react-icons/fi";
import { PiChefHatBold } from "react-icons/pi";
import { Link, useParams } from "react-router";
import MealCard from "./meal-card";

export default function Category() {
  const { categoryName } = useParams();

  const [meals, setMeals] = useState([]);
  const countRef = useRef(0);

  async function fetchMeals() {
    countRef.current++;
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
    const data = await res.json();
    setMeals(data.meals);
  }

  if (countRef.current == 0) {
    fetchMeals();
  }
  console.log(categoryName);
  return (
    <div>
      <header className="backdrop-blur-sm border-b border-orange-500/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to={"/"} className="bg-orange-500 p-2 rounded-lg">
                <PiChefHatBold className="h-8 w-8 text-white" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-orange-500">
                    {categoryName.toUpperCase()}
                  </span>
                  MEALS
                </h1>
                <p className="text-slate-400 text-sm">Fresh meals</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <PiChefHatBold className="h-6 w-6 text-orange-500" />
              <span className="text-slate-500 text-sm">
                {meals.length} Recipes
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="text-center my-8">
        <div className="inline-flex items-center space-x-6 rounded-full px-6 py-3 border border-orange-500/20">
          <div className="flex items-center space-x-2">
            <span className="text-slate-500 text-sm">
              <span className="text-orange-500 font-semibold">
                {meals.length + " "}
              </span>
              Meals Found
            </span>
          </div>
          <div className="w-px h-4 "></div>
          <div className="flex items-center space-x-2">
            <PiChefHatBold className="h-4 w-4 text-orange-500" />
            <span className="text-slate-500 text-sm">Premium Recipes</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 px-[10vw]">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} mealData={meal} />
        ))}
      </div>
    </div>
  );
}
