import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import {
<<<<<<< HEAD
  Entypo,
=======
  AntDesign,
  Entypo,
  EvilIcons,
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
<<<<<<< HEAD
  Ionicons,
  MaterialIcons,
=======
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
} from "@expo/vector-icons";


const iconMap = {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Entypo,
  Feather,
  FontAwesome6,
  FontAwesome5,
  Feather,
<<<<<<< HEAD

=======
  AntDesign,
  Entypo,
  EvilIcons,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
  // Add other icon sets here
};

const CustomIcon = ({ iconName }) => {
  let IconComponent = null;


  // Iterate through each icon set
  for (const [iconSetName, iconSet] of Object.entries(iconMap)) {
    if (iconSet.hasOwnProperty(iconName)) {
      // If the icon name exists in the current icon set, assign the icon component
      IconComponent = iconSet;
      break; // Exit loop
    }
  }

  // If no matching icon set found, default to FontAwesome
  IconComponent = IconComponent || FontAwesome6 ;

  return <IconComponent name={iconName} size={30} style={tw`mb-2`} />;
};

export default CustomIcon;