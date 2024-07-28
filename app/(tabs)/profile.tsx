import { View, Text } from "react-native";
import Screen from "../../components/Screen";
import { Link } from "expo-router";
import { useEffect } from "react";
import { useAppContext } from "../../Context";

export default function Profile() {
  const { user } = useAppContext();

  //mostrar los datos del usuario en caso de que este la sesion iniciadaaaaaaaa

  return (
    <Screen className="flex-1">
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white mb-4">Seccion perfil</Text>

        <Link href={'/sign-in'} asChild>
          <Text className="text-white text-xl">Iniciar sesión</Text>
        </Link>
      </View>
    </Screen>
  );
}
