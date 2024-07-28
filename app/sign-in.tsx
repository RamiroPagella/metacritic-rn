import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Screen from "../components/Screen";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useRootNavigationState } from "expo-router";
import { useAppContext } from "../Context";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { setSession, setUser } = useAppContext();

  const handlePress = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data) {
      console.log(data);
      setSession(data.session);
      setUser(data.user);
    }
    if (error) console.log(error);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
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
            className="self-center border border-white rounded p-2"
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
