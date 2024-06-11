import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView, TouchableOpacity,Alert } from "react-native";
import tw from "twrnc";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import api from '../util/Util'
import { useNavigation } from "@react-navigation/native";

const BusinessList = ({ route }) => {
  const { category } = route.params;
  const dummyImage = require("../assets/Images/businesslist.jpg");

  const dummyData = [
    {
      _id: "1",
      name: "Awesome Restaurant",
      rating: 4.7,
      price: "100 €",
      image: require("../assets/Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg"),
      deliveryTime: "60 min",
    },
    {
      _id: "2",
      name: "Great Cafe",
      rating: 4.3,
      price: "50 €",
      image: require("../assets/Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg"),
      deliveryTime: "45 min",
    },
    {
      _id: "3",
      name: "Nice Bakery",
      rating: 4.5,
      price: "30 €",
      image: require("../assets/Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg"),
      deliveryTime: "30 min",
    },
  ];

  const [businesses, setBusinesses] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    console.log('this is the id of the category: ',category._id)
    const categoryId=category._id
    console.log('this is the category id: ',categoryId)
    api.get(`business/fetch-by-category/${categoryId}`)
      .then((res) => {

        if (res.data.success){
        console.log('this is the data fetched fronthe backedn for fetch by category: ',res.data.businesses)


          setBusinesses(res.data.businesses)
        }
      else{
        Alert.alert(res.data.message)
      }
        
      })
      .catch((error) => console.error("Error fetching businesses:", error));
  }, [category]);

  return (
    <ScrollView style={tw`p-4`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="angle-left" size={30} color="black" />
      </TouchableOpacity>
      <Text style={tw`text-2xl font-bold mb-4`}>List of {category.name}</Text>
      <View style={tw`flex-row flex-wrap justify-between`}>
        {businesses.map((business) => (
          <View key={business._id} style={tw`w-full md:w-1/2 lg:w-1/3 p-2`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BusinessPage", { business: business });
              }}
              style={tw`bg-orange-50 p-4 rounded-md`}
            >
              <View>
                <Image
                  source={dummyImage}
                  style={tw`w-full h-40 rounded-md`}
                  resizeMode="cover"
                />
                <View style={tw`absolute bg-white rounded-sm bottom-2 right-2`}>
                  <Text style={tw`text-sm font-semibold py-1 px-2`}>
                    {business.opening_hours}
                  </Text>
                </View>
              </View>

              <View style={tw`flex-row items-center justify-between mt-2`}>
                <Text style={tw`text-base font-bold text-[#2e303d]`}>
                  {business.business_name}
                </Text>
                <View style={tw`flex-row items-center`}>
                  <FontAwesome name="star" size={17} color="black" />
                  <Text style={tw`ml-1 font-bold text-base`}>
                    {business.average_rating}
                  </Text>
                </View>
              </View>
              <Text style={tw`text-sm text-[#6e6d72]`}>
                {business.average_price}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BusinessList;
