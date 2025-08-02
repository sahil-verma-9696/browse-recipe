import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Category from "./pages/category/index.jsx";
import RecipePage from "./pages/recipe/index.jsx";
import { GlobalStateProvider } from "./context/GlobalState.jsx";
import Home from "./pages/home/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/recipe/:mealId" element={<RecipePage />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  </StrictMode>
);
