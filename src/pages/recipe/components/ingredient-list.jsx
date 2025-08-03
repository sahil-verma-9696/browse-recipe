import React, { memo, useState, useCallback } from "react";
import Image from "../../../components/image";
import { Check } from "lucide-react";

const IngredientList = memo((props) => {
  const { ingredients = [] } = props;

  const [checkedIngredients, setCheckedIngredients] = useState(new Map());

  const toggleIngredientCheck = useCallback((index) => {
    setCheckedIngredients((prev) => {
      const newChecked = new Map(prev);
      newChecked.set(index, !prev.get(index));
      return newChecked;
    });
  }, []);

  const checkedCount = Array.from(checkedIngredients.values()).filter(
    Boolean
  ).length;

  return (
    <>
      <div className="space-y-3">
        {ingredients.map((item, index) => (
          <Ingredient
            key={index}
            item={item}
            index={index}
            isChecked={!!checkedIngredients.get(index)}
            onToggle={toggleIngredientCheck}
          />
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        {checkedCount} of {ingredients.length} ingredients ready
      </div>
    </>
  );
});

export default IngredientList;

const Ingredient = memo((props) => {
  const { item, index, isChecked, onToggle } = props;

  const handleToggle = useCallback(() => {
    onToggle(index);
  }, [index, onToggle]);

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500 transition-opacity ${
        isChecked ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={handleToggle}
        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
          isChecked
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-orange-500"
        }`}
      >
        {isChecked && <Check className="w-4 h-4" />}
      </button>

      <Image
        src={item.imageUrl}
        alt={item.ingredient}
        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div
          className={`font-medium text-gray-700 ${
            isChecked ? "line-through" : ""
          }`}
        >
          {item.ingredient}
        </div>
        <div className="text-orange-600 font-semibold text-sm">
          {item.measure}
        </div>
      </div>
    </div>
  );
});
