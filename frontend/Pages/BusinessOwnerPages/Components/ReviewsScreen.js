import React, { useState,useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PagerView from "react-native-pager-view";
import { FontAwesome, MaterialCommunityIcons, Feather, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import ParallaxScrollView from "../../../assets/Components/ParallaxScrollView";
import { ImageBackground } from "react-native";
import api from "../../../util/Util";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";




const ReviewsScreen = ({businessFetched}) => {

  const ReviewItem = ({ item }) => {
    const [likes, setLikes] = useState(item.likes);
    const [liked, setLiked] = useState(item.liked);
    const [newComment, setNewComment] = useState("");
  
    return (
      <View
        style={tw`bg-white rounded-2xl p-4 shadow-md border border-gray-100 mb-6`}
      >
        <View style={tw`flex-row items-center mb-2`}>
          <Image
            source={
              typeof item.user.avatar === "string"
                ? { uri: item.user.avatar }
                : item.user.avatar
            }
            style={tw`w-8 h-8 rounded-full mr-2`}
          />
          <Text style={tw`font-bold text-lg`}>{item.user.username}</Text>
        </View>
        <Image
          source={
            typeof item.photo === "string" ? { uri: item.photo } : item.photo
          }
          style={tw`w-full h-40 mb-2 w-70 ml-4`}
          resizeMode="cover"
        />
        <Text style={tw`mb-2 text-center text-base`}>{item.text}</Text>
        
      </View>
    );
  };

   
   const dummyReviews = [
     {
       id: 1,
       text: "This place is awesome!",
       photo: require("../../../assets/Images/Home.jpg"), // Use require for local images
       user: {
         id: 1,
         username: "@user1",
         avatar: require("../../../assets/Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg"), // Use require for local images
       },
       likes: 10,
       liked: false,
       comments: [
         {
           id: 1,
           user: {
             id: 3,
             username: "@commenter1",
           },
           text: "I agree!",
         },
       ],
     },
     {
       id: 2,
       text: "Great experience!",
       photo: require("../../../assets/Images/Home.jpg"), // Use URL for online images
       user: {
         id: 2,
         username: "@user2",
         avatar: "../../Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg", // Use URL for online images
       },
       likes: 5,
       liked: false,
       comments: [],
     },
     // Add more dummy reviews as needed
   ];

    return(

        <ScrollView style={tw`p-1`}>
    
        <View style={tw` p-3 rounded-md shadow`}>
    
          <FlatList
            data={dummyReviews}
            renderItem={({ item }) => <ReviewItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    );
}

export default ReviewsScreen;