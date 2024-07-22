import { View, Text } from "react-native";

export default function Score({ score, maxScore }) {
  const getColors = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage < 40) return 'bg-red-500 text-white'
    if (percentage < 98) return 'bg-yellow-500 text-white'
    return 'bg-green-500 text-white'
  }

  const colors = getColors();

  return (
    <View className={`${getColors()} w-8 h-8 items-center justify-center rounded-full`}>
      <Text className="font-bold text-white text-lg"> {score} </Text>
    </View>
  );
}
