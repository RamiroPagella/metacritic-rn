import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, Pressable, View, FlatList } from "react-native";
import { HomeIcon } from "../../components/Icons";
import Screen from "../../components/Screen";

export default function About() {
  const arr = Array.from({ length: 50 }, (_, index) => index);

  const Item = ({ num }) => {
    return (
      <View className="border border-blue-800 rounded-xl mb-4 h-12 items-center justify-center">
        <Text className="text-white border border-red-800">
          {num}
        </Text>
      </View>
    );
  };

  return (
    <Screen>
      <FlatList
        className="border-4 border-red-800"
        data={arr}
        renderItem={({ item }) => <Item num={item} />}
        keyExtractor={(item) => item}
      />
    </Screen>
  );
}
