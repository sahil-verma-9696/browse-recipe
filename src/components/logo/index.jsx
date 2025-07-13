import { LuChefHat } from "react-icons/lu";
import Text from "../text";
import { APP_NAME } from "../../constant";

export default function Logo() {
  return (
    <div className={`flex items-center gap-2`}>
      <LuChefHat size={42} className={"text-orange-600"} />
      <Text className={"text-orange-600 font-bold text-3xl"}>{APP_NAME}</Text>
    </div>
  );
}
