import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";

/**
 * 
 * TODO: 
 * 1. press Tab to complete the search
 * 2. down arrow to select the meal
 * 3. click on the selected meal to open the recipe
 */
export default function SearchMeals({
  handleChange = () => {},
  searchResult = [],
  loading = false,
  isQuery = false,
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className="w-full max-w-md mx-auto relative my-10">
      {/* Search Input Container */}
      <div className="relative bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 focus-within:border-orange-400 focus-within:shadow-xl">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400">
          <AiOutlineSearch size={20} />
        </div>
        <input
          placeholder="Search delicious meals..."
          className="pl-12 pr-4 py-4 block w-full outline-none text-lg bg-transparent placeholder-orange-300 text-gray-800 font-medium"
          onChange={handleChange}
          type="text"
          name="search"
          id="search"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-400">
            <AiOutlineLoading3Quarters size={20} className="animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results */}
      <SearchResults
        result={searchResult}
        loading={loading}
        isQuery={isQuery}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
}

function SearchResults({ 
  result = [], 
  loading = false, 
  isQuery = false,
  selectedIndex = -1,
  setSelectedIndex = () => {}
}) {
  const Message = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8 text-orange-600">
          <AiOutlineLoading3Quarters size={24} className="animate-spin mr-3" />
          <span className="text-lg font-medium">Searching for meals...</span>
        </div>
      );
    }
    
    if (isQuery && !result.length) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <IoRestaurantOutline size={48} className="mb-3 text-orange-300" />
          <span className="text-lg font-medium">No meals found</span>
          <span className="text-sm text-gray-400 mt-1">Try a different search term</span>
        </div>
      );
    }
    
    if (!result.length) return null;
  };

  if (!isQuery && !loading) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-orange-100 shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
      <Message />
      
      {result.length > 0 && (
        <ul className="py-2">
          {result.map((item, index) => (
            <li 
              key={item.strMeal}
              className={`px-4 py-3 cursor-pointer transition-all duration-150 flex items-center group ${
                selectedIndex === index 
                  ? 'bg-orange-50 border-l-4 border-orange-400' 
                  : 'hover:bg-orange-25 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent'
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
              onMouseLeave={() => setSelectedIndex(-1)}
              onClick={() => {
                // TODO: Handle meal selection
                console.log('Selected meal:', item.strMeal);
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                <IoRestaurantOutline size={16} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-medium text-base truncate group-hover:text-orange-700 transition-colors duration-200">
                  {item.strMeal}
                </p>
                {item.strCategory && (
                  <p className="text-xs text-gray-500 mt-1">
                    {item.strCategory}
                  </p>
                )}
              </div>
              
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 text-xs">→</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {result.length > 0 && (
        <div className="border-t border-orange-100 px-4 py-2 bg-orange-25 bg-gradient-to-r from-orange-50 to-transparent">
          <p className="text-xs text-gray-500 text-center">
            Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Tab</kbd> to complete • 
            Use <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">↓</kbd> to navigate
          </p>
        </div>
      )}
    </div>
  );
}