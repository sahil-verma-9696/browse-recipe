import { useRef, useState } from "react";
import MealCard from "./meal-card";

/**
 * TODO:
 * we have to fetch the data from api
 *
 * 1. i have a api which give only 1 random meal
 * 2. but i have to fetch 3 random meals.
 *
 */
export default function FeaturedMeal() {
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const countRef = useRef(0);

  async function fetchFeaturedMeal() {
    countRef.current++;
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await res.json();
    setFeaturedMeals(function (prev) {
      return [...prev, data.meals[0]];
    });
  }

  if (countRef.current == 0) {
    fetchFeaturedMeal();
    fetchFeaturedMeal();
    fetchFeaturedMeal();
  }

  return (
    <section>
      <div className=" flex justify-center gap-4 my-4">
        <MealCard
          meal={featuredMeals[0]}
          isLoading={featuredMeals.length == 0}
        />
        <MealCard
          meal={featuredMeals[1]}
          isLoading={featuredMeals.length == 0}
        />
        <MealCard
          meal={featuredMeals[2]}
          isLoading={featuredMeals.length == 0}
        />
      </div>
    </section>
  );
}
