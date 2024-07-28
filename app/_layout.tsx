import { Link, Slot, Stack } from "expo-router";
import { View, Text, Pressable, AppState } from "react-native";
import { Logo } from "../components/Logo";
import { CircleInfoIcon } from "../components/Icons";
import { ContextProvider } from "../Context";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Layout() {

  return (
    <ContextProvider>
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
    </ContextProvider>
  );
}


