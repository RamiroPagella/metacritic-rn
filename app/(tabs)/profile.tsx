import { View, Text, Pressable, Image } from "react-native";
import Screen from "../../components/Screen";
import { Link } from "expo-router";
import { useEffect } from "react";
import { useAppContext } from "../../Context";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const { user, session } = useAppContext();
  const noProfileImg = require("../../assets/no-profile-picture.jpg");

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Screen className="flex-1">
      <View className="flex-1 justify-center bg-black">
        {user ? (
          <View className="flex-1 items-center justify-center">
            <Image
              source={noProfileImg}
              className="w-24 h-24 rounded-full mb-8"
            />
            <Text className="text-white text-5xl">{user.user_metadata.username}</Text>

            <Pressable
              onPress={signOut}
              className="border border-white rounded-full p-4"
            >
              <Text className="text-white text-xl">Logout</Text>
            </Pressable>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-3xl mb-16">
              You are not Logged in.
            </Text>

            <Link href={"/sign-in"} asChild>
              <Text className="text-white text-xl">Iniciar sesión</Text>
            </Link>
          </View>
        )}
      </View>
    </Screen>
  );
}
