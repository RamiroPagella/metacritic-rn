import { Link, Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import Screen from "../components/Screen";
import { useContext, useEffect, useState } from "react";
import { getGameDetails } from "../lib/metacritic";
import Score from "../components/Score";
import { HeartFilledIcon, HeartIcon } from "../components/Icons";
import { Context } from "../Context";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [gameInfo, setGameInfo] = useState(null);
  const { favGames, setFavGames } = useContext(Context);
  const [isFav, setIsFav] = useState(false);


  useEffect(() => {
    if (!id) return;
    getGameDetails(id)
      .then((game) => setGameInfo(game))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    let isFav = false;
    if (favGames.length > 0) {
      favGames.forEach((game) => {
        if (game.slug === id) isFav = true;
      });
    }
    setIsFav(isFav);
  }, [favGames]);

  const LikeButton = () => {
    return (
      <Pressable
        onPress={() => {
          if (!gameInfo) return;
          setIsFav(true);
          setFavGames((prev) => [...prev, gameInfo]);
        }}
      >
        <HeartIcon />
      </Pressable>
    );
  };

  const DislikeButton = () => {
    return (
      <Pressable
        onPress={() => {
          if (!gameInfo) return;
          setIsFav(false);
          setFavGames((prev) => prev.filter((prev) => prev.slug !== id));
        }}
      >
        <HeartFilledIcon />
      </Pressable>
    );
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft: () => { },
          headerRight: () => (isFav ? <DislikeButton /> : <LikeButton />),
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
                source={{ uri: gameInfo.img }}
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
