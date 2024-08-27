import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { View, AppState } from "react-native";
import { Logo } from "../components/Logo";
import { supabase } from "../lib/supabase";
import Providers from "@/providers";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Layout() {
  return (
    <GluestackUIProvider mode="light">
      <Providers>
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
      </Providers>
    </GluestackUIProvider>
  );
}
