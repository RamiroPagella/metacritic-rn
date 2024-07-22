import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [favGames, setFavGames] = useState([]);

  return (
    <Context.Provider
      value={{ searchValue, setSearchValue, favGames, setFavGames }}
    >
      {children}
    </Context.Provider>
  );
};
