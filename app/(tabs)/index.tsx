import { View, ActivityIndicator, FlatList, TextInput } from "react-native";
import { useEffect, useState, useContext } from "react";
import { getLatestGames } from "../../lib/metacritic";
import { AnimatedGameCard } from "../../components/GameCard";
import { SearchIcon } from "../../components/Icons";
import Screen from "../../components/Screen";
import { Context } from "../../Context";
import { useDebouncedCallback } from "use-debounce";

export default function Index() {
  const { searchValue, setSearchValue } = useContext(Context);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLatestGames()
      .then((games) => {
        setGames(games);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  const handleSearch = useDebouncedCallback((string) => {
    setLoading(true);
    getLatestGames()
      .then((games) => {
        if (string === "") setGames(games);
        else {
          const filteredGames = games.filter((game) =>
            game.title.includes(string)
          );
          setGames(filteredGames);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, 300);

  return (
    <Screen>
      <View className="h-12 justify-center mb-2">
        <TextInput
          className="rounded-full bg-white/10 h-12 text-white pl-10"
          value={searchValue}
          onChangeText={(e) => {
            setSearchValue(e);
          }}
        />
        <SearchIcon className="absolute ml-2" />
      </View>

      {loading ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => {
            return <AnimatedGameCard game={item} index={index} />;
          }}
        ></FlatList>
      )}
    </Screen>
  );
}
