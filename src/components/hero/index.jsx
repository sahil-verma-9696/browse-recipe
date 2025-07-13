import { APP_HEADLINE } from "../../constant";
import Group from "../group";
import Text from "../text";
import { useState } from "react";

export default function Hero() {
  const [searchResult, setSearchResult] = useState({});
  const [filteredResult, setFilteredResult] = useState(searchResult?.meals);

  async function handleChange(event) {
    const query = event.target.value.trim();
    const firstLetter = query.charAt(0);
    if (query.length == 1) {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
      );
      const data = await res.json();
      // setting data to state
      setSearchResult(data);
      setFilteredResult(data?.meals);
    }
    setFilteredResult((prev) =>
      prev.filter((meal) =>
        meal.strMeal.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  }
  return (
    <section>
      <Group>
        <Text
          className={
            "text-7xl my-10 italic w-320 text-wrap text-center mx-auto"
          }
          htmlTag={"h1"}
        >
          {APP_HEADLINE}
        </Text>
        <input className="border" onChange={handleChange} type="text" />
        {searchResult && (
          <div>
            {filteredResult?.map((meal) => {
              console.log(meal);
              return <div key={meal.idMeal}>{meal.strMeal}</div>;
            })}
          </div>
        )}
      </Group>
      <Group></Group>
    </section>
  );
}
