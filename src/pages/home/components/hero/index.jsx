import { APP_HEADLINE } from "../../../../constant";
import Text from "../../../../components/text";
import { useState } from "react";
import SearchMeals from "../search";

/**
 * on every input change
 * 1. fetch the data
 * 2. set the data to result
 * 3. filter the data
 *
 * case: to show the filtered data on ui
 * we have to inform the react to update the ui
 * i knows 2-method to tell react for update (1. useEffect 2. setState)
 *
 * case : with useState
 * 1. STATES : searchResult(for result), query(for input, and update ui on every input change)
 *
 * case : with useEffect
 * 1. STATES : searchResult(for result), query(for input, and update ui on every input change)
 *
 * mention `query` in useEffect dependencies array
 *
 */
export default function Hero() {
  const [searchResult, setSearchResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  async function handleChange(event) {
    const userInput = event.target.value.trim();
    const firstLetter = userInput.charAt(0);
    setQuery(userInput);
    if (userInput.length == 1 && !searchResult?.meals) {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
      );
      const data = await res.json();
      setLoading(false);
      // setting data to state
      console.log(data);
      setSearchResult(data);
    }

    if (userInput.length == 0) {
      setSearchResult({});
    }
  }

  return (
    <section>
      <Text
        className={"text-7xl my-10 italic w-320 text-wrap text-center mx-auto select-none "}
        htmlTag={"h1"}
      >
        {APP_HEADLINE}
      </Text>
      <SearchMeals
        handleChange={handleChange}
        searchResult={searchResult?.meals?.filter((meal) =>
          meal.strMeal.toLowerCase().startsWith(query.toLowerCase())
        )}
        loading={loading}
        isQuery={query.length > 0}
      />
    </section>
  );
}
