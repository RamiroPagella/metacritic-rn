import { Tabs } from "expo-router";
import {
  HeartFilledIcon,
  HomeIcon,
  PlusIcon,
  ProfileIcon,
} from "../../components/Icons";
import { useAppContext } from "../../Context";
import { useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function TabsLayout() {
  const { setSession, setUser } = useAppContext();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("event del onAuthStateChange", event);
      console.log(JSON.stringify(session, null, 2));

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

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <HeartFilledIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="new-game"
        options={{
          title: "New",
          tabBarIcon: ({ color }) => <PlusIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
