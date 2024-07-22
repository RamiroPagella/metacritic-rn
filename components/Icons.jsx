import { AntDesign, Feather } from "@expo/vector-icons";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

export const CircleInfoIcon = (props) => {
  return <FontAwesome6 name="circle-info" color="white" size={30} {...props} />;
};

export const HomeIcon = (props) => {
  return <FontAwesome name="home" size={30} color={"white"} {...props} />;
};

export const InfoIcon = (props) => {
  return <FontAwesome name="info" size={30} color={"white"} {...props} />;
};

export const SearchIcon = (props) => {
  return <Feather name="search" size={24} color="white" {...props} />;
};

export const HeartIcon = (props) => {
  return <AntDesign name="hearto" size={24} {...props} />;
};

export const HeartFilledIcon = (props) => {
  return <AntDesign name="heart" size={24} {...props} />;
};
