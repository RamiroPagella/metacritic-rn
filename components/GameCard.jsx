import { View, Image, Text, Animated, Pressable } from "react-native";
import { useRef, useEffect } from "react";
import Score from "./Score";
import { Link } from "expo-router";

export function GameCard({ game }) {
  return (
    <Link href={`/${game.slug}`} asChild className="mx-auto mt-2">
      <Pressable className="rounded-xl bg-white/10 p-3 items-center justify-center flex-row border active:bg-white/20 active:border-white/40">
        <View className="mr-4">
          <Image
            source={{ uri: game.image || game.img }}
            className="w-[107px] h-[147px] rounded-xl"
          />
        </View>

        <View className="h-40 flex-1 justify-between">
          <Text className="text-white text-xl font-bold">{game.title}</Text>
          <Score score={game.score} maxScore={100} />
          <Text className="text-gray-300 mt-2 flex-shrink">
            {game.description.slice(0, 100)}...
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

export const AnimatedGameCard = ({ game, index }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
};
