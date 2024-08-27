import { View, ActivityIndicator, FlatList, TextInput, Text } from "react-native";
import { useEffect, useState } from "react";
import { getGames } from "../../lib/utils";
import { AnimatedGameCard } from "../../components/GameCard";
import { SearchIcon } from "../../components/Icons";
import Screen from "../../components/Screen";
import { Game } from "../../lib/types";
import { useDebouncedCallback } from "use-debounce";
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";

export default function Index() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [error, setError] = useState<Error | null>(null);
  const [toastId, setToastId] = useState("");

  const handleToast = (msg: string) => {
    if (!toast.isActive(toastId)) {
      const showNewToast = (msg: string) => {
        const newId = Math.random().toString();
        setToastId(newId);
        toast.show({
          id: newId,
          placement: "top",
          duration: 3000,
          render: ({ id }) => {
            const uniqueToastId = "toast-" + id;
            return (
              <Toast nativeID={uniqueToastId} action="muted" variant="solid">
                <ToastTitle>Error:</ToastTitle>
                <ToastDescription>{msg}</ToastDescription>
              </Toast>
            );
          },
        });
      };
    }
  };

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const handleSearch = useDebouncedCallback(async (title: string) => {
    setLoading(true);
    try {
      const data = await getGames(title);
      setGames(data);
    } catch (error) {
      console.log("error del getGames", error.message);
      setError(error);
      handleToast(error.message);
    } finally {
      setLoading(false);
    }
  }, 300);

  return (
    <Screen>
      <View className="h-12 justify-center mb-2">
        <TextInput
          className="rounded-full bg-white/10 h-12 text-white pl-10"
          onChangeText={handleSearch}
        />
        <SearchIcon className="absolute ml-2" />
      </View>

      {loading && (
        <View className="flex-1 justify-center">
          <ActivityIndicator />
        </View>
      )}
      {!loading &&
        (error && !games ? (
          <Text className="text-white">{error.message}</Text>
        ) : (
          <FlatList
            data={games}
            keyExtractor={(game) => game.slug}
            renderItem={({ item, index }) => {
              return <AnimatedGameCard game={item} index={index} />;
            }}
          ></FlatList>
        ))}
    </Screen>
  );
}
