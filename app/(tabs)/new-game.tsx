import Screen from "@/components/Screen";
import { Text, TextInput, View } from "react-native";

export default function NewGame() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-3xl font-bold mb-24">
          Upload a game
        </Text>

        <Text className="text-white text-2xl font-semibold">Title</Text>
        <TextInput className="h-11 bg-white/10 w-full rounded-full text-white" />

        <Text className="text-white text-2xl font-semibold">Title</Text>
      </View>
    </Screen>
  );
}
