import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { APP_NAME } from "../constant";
import usePersistState from "../hook/usePersistState";

const defaultValues = {
  favorites: [],
  setFavorites: () => {},
};

const GlobalContext = createContext(defaultValues);

export const GlobalStateProvider = ({ children }) => {
  const [favorites, setFavorites] = usePersistState([], "favorites", {
    onError: (error) => console.warn("localStorage error:", error),
  });
  return (
    <GlobalContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;
