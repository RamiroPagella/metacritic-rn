import { Link, Slot, Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { View, Text, Pressable, AppState } from "react-native";
import { Logo } from "../components/Logo";
import { ContextProvider, useAppContext } from "../Context";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Layout() {
  

  return (
    <GluestackUIProvider mode="light"><ContextProvider>
        <View className="bg-black flex-1">
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "black" },
              headerTintColor: "red",
              headerTitle: "",
              headerLeft: () => <Logo />,
            }}
          />
        </View>
      </ContextProvider></GluestackUIProvider>
  );
}
