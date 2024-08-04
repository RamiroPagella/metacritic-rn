import { HeartFilledIcon, HeartIcon } from "@/components/Icons";
import { Pressable } from "react-native";

interface Props {
  handlePress: () => void;
}

export const LikeButton = ({ handlePress }: Props) => {
  return (
    <Pressable onPress={handlePress}>
      <HeartIcon />
    </Pressable>
  );
};

export const DislikeButton = ({ handlePress }: Props) => {
  return (
    <Pressable onPress={handlePress}>
      <HeartFilledIcon />
    </Pressable>
  );
};
