import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { Game } from "./types";
import { useDebouncedCallback } from "use-debounce";

export const getGames = async (title?: string): Promise<Game[]> => {
  try {
    if (title) {
      const response: PostgrestSingleResponse<Game[]> = await supabase
        .from("games")
        .select()
        .ilike("title", `%${title}%`);
      return response.data;
    }
    const response: PostgrestSingleResponse<Game[]> = await supabase
      .from("games")
      .select();
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

export const getGameDetails = async (id: string): Promise<Game> => {
  const response: PostgrestSingleResponse<Game> = await supabase
    .from("games")
    .select()
    .eq("id", id)
    .single();
  return response.data;
};

export const handleGameLike = async (gameId: string, userId: string) => {
  const { data }: PostgrestSingleResponse<Game> = await supabase
    .from("games")
    .select()
    .eq("id", gameId)
    .single();

  if (!data.likes) {
    const { data, error } = await supabase
      .from("games")
      .update({ likes: [userId] })
      .eq("id", gameId);
    if (error) throw new Error(error.message);
    return;
  }

  if (data.likes.includes(userId)) {
    const response = await supabase
      .from("games")
      .update({ likes: data.likes.filter((userId) => userId !== userId) })
      .eq("id", gameId);

    if (response.error) throw new Error(response.error.message);
  } else {
    const response = await supabase
      .from("games")
      .update({ likes: [...data.likes, userId] })
      .eq("id", gameId);

    if (response.error) throw new Error(response.error.message);
  }
};

export const getLikedGames = async (userId: string) => {
  const { data, error }: PostgrestSingleResponse<Game[]> = await supabase
    .from("games")
    .select()
    .contains("likes", [userId]);

  if (error) throw new Error(error.message);

  return data;
};
