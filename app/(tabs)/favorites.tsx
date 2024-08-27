import Screen from "../../components/Screen";
import { FlatList, Text, View } from "react-native";
import { AnimatedGameCard } from "../../components/GameCard";
import { useEffect, useState } from "react";
import { Game } from "@/lib/types";
import { getLikedGames } from "@/lib/utils";
import { useAppContext } from "@/providers/context";
import { supabase } from "@/lib/supabase";
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";

export default function Favorites() {
  const [data, setData] = useState<Game[]>([]);
  const { user } = useAppContext();

  useEffect(() => {
    if (!user) return;
    getLikedGames(user.id)
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    supabase
      .channel("")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "games",
        },
        (payload: RealtimePostgresUpdatePayload<Game>) => {
          const updatedGame = payload.new;
          if (updatedGame.likes.includes(user.id)) {
            setData((prev) => [...prev, updatedGame]);
          } else {
            setData((prev) =>
              prev.filter((game) => game.id !== updatedGame.id)
            );
          }
        }
      )
      .subscribe();
  }, []);

  return (
    <Screen>
      {user ? (
        <FlatList
          data={data}
          keyExtractor={(game) => game.id}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        ></FlatList>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white">You need to be logged in</Text>
        </View>
      )}
    </Screen>
  );
}
