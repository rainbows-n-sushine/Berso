import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CatagoriesList = () => {
     const navigation = useNavigation();
  const categories = [
    { id: "1", name: "Category 1" },
    { id: "2", name: "Category 2" },
    { id: "3", name: "Category 3" },
    { id: "4", name: "Category 4" },
    { id: "5", name: "Category 5" },
  ];

  const renderItem = ({ item }) => (
    <View style={tw`p-4 border-b border-gray-300`}>
      <Text style={tw`text-lg`}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-4 `}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="angle-left" size={35} color="black" />
      </TouchableOpacity>
      <Text style={tw`text-xl font-bold text-center`}>All Catagories</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default CatagoriesList;
