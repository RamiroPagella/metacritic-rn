import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Screen from "../components/Screen";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, router } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handlePress = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) console.log(error);
    else router.replace("/(tabs)/profile");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Screen className="justify-around items-center">
        <Text className="font-bold text-white text-4xl">Iniciar sesión</Text>

        <View className="p-4 border self-stretch">
          <Text className="text-white mb-2 text-xl text-center">
            Correo electronico
          </Text>

          <TextInput
            className="bg-white/10 rounded-full mb-6 h-12 pl-4 text-white text-lg"
            onChangeText={setEmail}
            autoCapitalize="none"
            textAlignVertical="center"
          />

          <Text className="text-white mb-2 text-xl text-center">
            Contraseña
          </Text>

          <TextInput
            className="bg-white/10 rounded-full mb-6 h-12 pl-4 text-white text-lg"
            onChangeText={setPassword}
            autoCapitalize="none"
            textAlignVertical="center"
          />

          <Pressable
            onPress={handlePress}
            className="self-center border border-white rounded-full p-2 px-4"
          >
            <Text className="text-white text-xl">Iniciar sesión</Text>
          </Pressable>
        </View>

        <Link href={"/register"}>
          <Text className="text-3xl text-white">Registrarse</Text>
        </Link>
      </Screen>
    </KeyboardAvoidingView>
  );
}
