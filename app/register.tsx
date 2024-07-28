import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Screen from "../components/Screen";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signUp = async () => {
    console.log("el signup");
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { username },
      },
    });

    if (data) console.log(data);
    if (error) console.error(error);
  };

  return (
    <KeyboardAvoidingView className="flex-1">
      <Screen className="flex-1 items-center justify-around">
        <Text className="text-4xl text-white font-bold">Registrarse</Text>

        <View className="p-4 border self-stretch">
          <Text className="text-white mb-2 text-xl text-center">Email</Text>

          <TextInput
            className="bg-white/10 rounded-full mb-6 h-12 pl-4 text-white text-lg"
            autoCapitalize="none"
            textAlignVertical="center"
            onChangeText={setEmail}
          />

          <Text className="text-white mb-2 text-xl text-center">Username</Text>

          <TextInput
            className="bg-white/10 rounded-full mb-6 h-12 pl-4 text-white text-lg"
            autoCapitalize="none"
            textAlignVertical="center"
            onChangeText={setUsername}
          />

          <Text className="text-white mb-2 text-xl text-center">Password</Text>

          <TextInput
            className="bg-white/10 rounded-full mb-6 h-12 pl-4 text-white text-lg"
            autoCapitalize="none"
            textAlignVertical="center"
            onChangeText={setPassword}
          />
        </View>

        <Pressable onPress={signUp}>
          <Text className="text-white text-xl font-bold">Confirmar</Text>
        </Pressable>
      </Screen>
    </KeyboardAvoidingView>
  );
}
