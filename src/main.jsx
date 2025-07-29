import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Category from "./pages/category/index.jsx";
import RecipePage from "./pages/recipe/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/recipe/:mealId" element={<RecipePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
