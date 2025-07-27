import { BiCoffeeTogo } from "react-icons/bi";
import Button from "../button";
import Logo from "../logo";
import Navigation from "../navigation";
import Text from "../text";
import { BROWSE_TEXT, BUY_ME_COFFEE_TEXT } from "../../constant";

export default function Header() {
  return (
    <header className={`flex justify-between items-center px-4 py-2`}>
      <Logo />
      <Navigation>
        <a href="#categories">{BROWSE_TEXT}</a>
        <Button className={"bg-orange-600 text-white font-bold py-2 px-4"}>
          <BiCoffeeTogo />
          <Text>{BUY_ME_COFFEE_TEXT}</Text>
        </Button>
      </Navigation>
    </header>
  );
}
