import { Link, Slot, Stack } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { Logo } from "../components/Logo";
import { CircleInfoIcon } from "../components/Icons";
import { ContextProvider } from "../Context";

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

