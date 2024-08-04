import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import Screen from "../components/Screen";
import { useEffect, useState } from "react";
import { getGameDetails, handleGameLike } from "../lib/utils";
import Score from "../components/Score";
import { useAppContext } from "../Context";
import { DislikeButton, LikeButton } from "@/components/ui/[id]/Like";
import { supabase } from "@/lib/supabase";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const { user } = useAppContext();

  useEffect(() => {
    if (!id) return;
    getGameDetails(id as string)
      .then((game) => {
        setGameInfo(game);
        if (game.likes && game.likes.includes(user.id)) setIsFav(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handlePress = async () => {
    if (!gameInfo) return;
    try {
      await handleGameLike(gameInfo.id, user.id);
      setIsFav(!isFav);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerBackVisible: true,
          headerLeft: () => <></>,
          headerRight: () =>
            isFav ? (
              <DislikeButton handlePress={handlePress} />
            ) : (
              <LikeButton handlePress={handlePress} />
            ),
          headerTitle: gameInfo?.title ? gameInfo.title : "",
        }}
      />

      <View className="items-center justify-center flex-1">
        {!gameInfo ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <ScrollView>
            <View className="items-center justify-center">
              <Image
                source={{ uri: gameInfo.image }}
                className="rounded mb-4 w-[214px] h-[294]"
              />

              <Text className="font-bold text-white text-2xl mb-4 text-center">
                {gameInfo.title}
              </Text>

              <Score score={gameInfo.score} maxScore={100} />

              <Text className="text-white/70 mt-4 text-left text-base">
                {gameInfo.description}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}
