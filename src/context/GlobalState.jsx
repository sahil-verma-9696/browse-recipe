import { useContext, useState } from "react";
import { createContext } from "react";

const defaultValues = {
  favorites: [],
  setFavorites: () => {},
};

const GlobalContext = createContext(defaultValues);

export const GlobalStateProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  return (
    <GlobalContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;
