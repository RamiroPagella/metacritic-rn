import Screen from "../../components/Screen";
import { FlatList, Text } from "react-native";
import { AnimatedGameCard } from "../../components/GameCard";
import { useEffect, useState } from "react";
import { Game } from "@/lib/types";
import { getLikedGames } from "@/lib/utils";
import { Context, useAppContext } from "@/Context";
import { supabase } from "@/lib/supabase";
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";

export default function Favorites() {
  const [data, setData] = useState<Game[]>([]);
  const { user } = useAppContext();

  useEffect(() => {
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
      <FlatList
        data={data}
        keyExtractor={(game) => game.id}
        renderItem={({ item, index }) => (
          <AnimatedGameCard game={item} index={index} />
        )}
      ></FlatList>
    </Screen>
  );
}
