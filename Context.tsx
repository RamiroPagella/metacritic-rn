import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface ContextType {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  favGames: any[];
  setFavGames: React.Dispatch<React.SetStateAction<any[]>>
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}

export const Context = createContext<ContextType | null>(null);

export const ContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [favGames, setFavGames] = useState([]);
  const [user, setUser] = useState<User>(null);
  const [session, setSession] = useState<Session>(null);

  return (
    <Context.Provider
      value={{
        searchValue,
        setSearchValue,
        favGames,
        setFavGames,
        user,
        setUser,
        session,
        setSession,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = (): ContextType => {
  return useContext(Context);
};
