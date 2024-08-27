import { supabase } from "@/lib/supabase";
import { useAppContext } from "@/providers/context";
import { useEffect } from "react";

export default function useAuthstateChange() {
  const { setSession, setUser } = useAppContext();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // console.log("event del onAuthStateChange", event);
      // console.log(JSON.stringify(session, null, 2));

      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        setSession(session);
        setUser(session?.user);
      }
      if (event === "SIGNED_OUT") {
        setSession(null);
        setUser(null);
      }
    });
  }, []);
}
