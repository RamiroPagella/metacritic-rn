import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";
import { User } from "@supabase/supabase-js";

interface ContextType {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}

export const Context = createContext<ContextType | null>(null);

export const ContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState<User>(null);
  const [session, setSession] = useState<Session>(null);

  return (
    <Context.Provider
      value={{
        searchValue,
        setSearchValue,
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