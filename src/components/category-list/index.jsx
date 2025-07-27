import React, { useRef, useState } from "react";
import CategoryCard from "./category-card";
import Text from "../text";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const fetchCountRef = useRef(0);

  async function fetchCategories() {
    fetchCountRef.current++;
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await res.json();
    setCategories(data.categories);
  }

  if (fetchCountRef.current == 0) {
    fetchCategories();
  }
  return (
    <div className="px-[10vw]" id="categories">
      <Text
        className={
          "text-7xl my-10 italic w-320 text-wrap text-center mx-auto underline hover:text-orange-600 select-none"
        }
      >
        Popular Categories
      </Text>
      <div className="grid grid-cols-4 gap-4">
        {categories?.map((category) => (
          <CategoryCard categoryData={category} key={category.idCategory} />
        ))}
      </div>
    </div>
  );
}
