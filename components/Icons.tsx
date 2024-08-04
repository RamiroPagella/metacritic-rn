import { AntDesign, Feather } from "@expo/vector-icons";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SvgProps } from "react-native-svg";

export const CircleInfoIcon = (props: SvgProps) => {
  return <FontAwesome6 name="circle-info" color="white" size={30} {...props} />;
};

export const HomeIcon = (props: SvgProps) => {
  return <FontAwesome name="home" size={30} color={"white"} {...props} />;
};

export const InfoIcon = (props: SvgProps) => {
  return <FontAwesome name="info" size={30} color={"white"} {...props} />;
};

export const SearchIcon = (props: SvgProps) => {
  return <Feather name="search" size={24} color="white" {...props} />;
};

export const HeartIcon = (props: SvgProps) => {
  return <AntDesign name="hearto" size={24} {...props} />;
};

export const HeartFilledIcon = (props: SvgProps) => {
  return <AntDesign name="heart" size={24} {...props} />;
};

export const ProfileIcon = (props: SvgProps) => {
  return <MaterialCommunityIcons name="account" size={24} {...props} />;
};

export const PlusIcon = (props: SvgProps) => {
  return <AntDesign name="plus" size={24} {...props} />;
}
