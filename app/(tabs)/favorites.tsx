import { useContext } from "react";
import Screen from "../../components/Screen";
import { Context } from "../../Context";
import { FlatList, Text } from "react-native";
import { AnimatedGameCard } from "../../components/GameCard";

export default function Favorites() {
  const { favGames } = useContext(Context);

  return (
    <Screen>
      {favGames.length ? (
        <FlatList
          data={favGames}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      ) : (
        <Text className="text-white text-center">
          No hay elementos en favoritos.
        </Text>
      )}
    </Screen>
  );
}
