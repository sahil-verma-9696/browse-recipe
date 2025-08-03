import { BiCoffeeTogo } from "react-icons/bi";
import Button from "../../../../components/button";
import Logo from "../../../../components/logo";
import Text from "../../../../components/text";
import { BROWSE_TEXT, BUY_ME_COFFEE_TEXT } from "../../../../constant";
import { useState } from "react";
import FavoriteMealsAsideModel from "../../../../components/model-favorite-meals-aside";

export default function Header() {
  const [showFavoritesModel, setShowFavoritesModel] = useState(false);
  return (
    <>
      <header className={`flex justify-between items-center px-4 py-2`}>
        <Logo />
        <nav className="flex items-center gap-2">
          <a href="#categories">{BROWSE_TEXT}</a>
          <Button
            onClick={() => setShowFavoritesModel(true)}
            className={"text-orange-600 font-bold"}
          >
            Favorites Meal
          </Button>
          <Button className={"bg-orange-600 text-white font-bold py-2 px-4"}>
            <BiCoffeeTogo />
            <Text>{BUY_ME_COFFEE_TEXT}</Text>
          </Button>
        </nav>
      </header>

      {showFavoritesModel && (
        <FavoriteMealsAsideModel close={() => setShowFavoritesModel(false)} />
      )}
    </>
  );
}
