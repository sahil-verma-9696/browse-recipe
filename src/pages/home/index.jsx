import React from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import FeaturedMeal from "./components/featured-meal";
import CategoryList from "./components/category-list";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedMeal />
      <CategoryList />
    </main>
  );
}
