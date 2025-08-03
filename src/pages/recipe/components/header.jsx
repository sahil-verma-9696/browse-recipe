import React, { memo } from "react";
import { PiChefHatBold } from "react-icons/pi";
import { Link } from "react-router";

const Header = memo((props) => {
  const { strMeal = "strMeal", strArea = "strArea" } = props;
  return (
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
                  {strMeal.toUpperCase() + " "}
                </span>
                MEALS
              </h1>
              <p className="text-slate-400 text-sm">{strArea} Cuisine</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <PiChefHatBold className="h-6 w-6 text-orange-500" />
            <span className="text-slate-500 text-sm">{0} Recipes</span>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
