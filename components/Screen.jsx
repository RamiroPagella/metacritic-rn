import { View } from "react-native";

export default function Screen(props) {
  return <View className="flex-1 bg-black pt-4 px-2 justify-center" {...props}>{props.children}</View>;
}
