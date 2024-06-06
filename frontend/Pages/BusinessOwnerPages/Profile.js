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
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PagerView from "react-native-pager-view";
import { FontAwesome, MaterialCommunityIcons, Feather, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import ParallaxScrollView from "../../assets/Components/ParallaxScrollView";
import { ImageBackground } from "react-native";
import api from "../../util/Util";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const business = {
//   name: "Sample Restaurant",
//   category: "Restaurant",
//   rating: 4.5,
//   email: "info@samplerestaurant.com",
//   phone: "+1234567890",
//   address: "123 Main Street, City, Country",
//   hours: "Mon-Fri: 9am-10pm",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec interdum leo.",
//   photos: [
//     "https://example.com/photo1.jpg",
//     "https://example.com/photo2.jpg",
//     "https://example.com/photo3.jpg",
//   ],
// };



const Header = () => {
  
  const [business,setBusiness]=useState({

    business_name:"",
    category:[],
    rating:0,
    photos:[],
    website:"",
    email:"",
    phone:"",
    address:"",
    opening_hours:"",
    description:""
    
    
  })


useEffect(()=>{


  getBusinessInfo()


},[])

const getBusinessInfo=async()=>{
  console.log("this is the business in profile")
  const businessId= await AsyncStorage.getItem('currentBusiness')
  console.log('this is the id of the business ',businessId)

  await api.get(`business/get-one/${businessId}`)
 .then((res)=>{
  console.log(res.data)
  if(res.data.success){
    let _business=res.data.business
   setBusiness(_business) 
   

    console.log("this is the business in profile getBusinessInfo", res.data.business)
  }else{
    console.log(res.data.message)
  }
 }).catch((error)=>{

  if(error){
    console.log('this is the erro in getBusiness: ',error.message)
  }
 })
  }

  return (
    <View style={tw`h-[60]`}>
      <ImageBackground
        source={require("../../assets/Images/HomeBG.jpg")}
        style={tw`flex-1`}
        resizeMode="cover"
      >
        <SafeAreaView style={tw`flex-row-reverse ml-2 mt-2`}>
          <TouchableOpacity
            style={tw`px-2`}
            onPress={() => {
              // navigation.navigate("EditUserProfile");
            }}
          >
            <Feather name="share" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-2`}
            onPress={() => {
              // navigation.navigate("EditUserProfile");
            }}
          >
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={tw`flex-row items-center bg-white top-42 `}>
          <Image
            source={require("../../assets/Images/randomlogo.png")}
            style={tw`w-12 h-12`}
          />
          <View style={tw`flex-row items-center`}>
            {/* <Image
          source={{ uri: "https://example.com/profile_picture_url" }}
          style={tw`w-12 h-12 rounded-full`}
        /> */}
            <View style={tw`ml-4`}>
              <Text style={tw`font-bold text-lg`}>{business.business_name}</Text>
              <Text style={tw`text-gray-500`}>{business.category}</Text>
              <View style={tw`flex-row items-center my-2`}>
                <FontAwesome
                  name="star"
                  size={15}
                  color="orange"
                  style={tw`mr-2 `}
                />
                <FontAwesome
                  name="star"
                  size={15}
                  color="orange"
                  style={tw`mr-2`}
                />
                <FontAwesome
                  name="star"
                  size={15}
                  color="orange"
                  style={tw`mr-2`}
                />
                <Text style={tw`text-gray-700 mr-2`}>
                  Rating: {business.rating}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const dummyServices = [
  {
    id: "1",
    title: "Fine Dining",
    description: "Exquisite cuisine and impeccable service",
    icon: "restaurant",
  },
  {
    id: "2",
    title: "Catering",
    description: "Custom menus for events and gatherings",
    icon: "shoppingcart",
  },
  {
    id: "3",
    title: "Takeout",
    description: "Quick and convenient meals to-go",
    icon: "meh",
  },
  {
    id: "4",
    title: "Delivery",
    description: "Hot meals delivered right to your door",
    icon: "enviromento",
  },
  {
    id: "5",
    title: "Bar & Lounge",
    description: "Craft cocktails and a relaxing ambiance",
    icon: "cocktail",
  },
  {
    id: "6",
    title: "Private Dining",
    description: "Exclusive space for intimate gatherings",
    icon: "table",
  },
];

const ServicesScreen = () => (
  <ScrollView style={tw`p-4`}>
    <View style={tw`flex-1 bg-gray-100 py-5 px-4`}>
    <FlatList
      data={dummyServices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={tw`bg-white rounded-lg shadow-lg p-4 mb-4 flex-row items-center`}
        >
          {item.icon === "restaurant" && (
            <Ionicons
              name="restaurant-outline"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          {item.icon === "shoppingcart" && (
            <Feather
              name="shopping-cart"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          {item.icon === "meh" && (
            <AntDesign name="meh" size={24} color="#f59e0b" style={tw`mr-4`} />
          )}
          {item.icon === "enviromento" && (
            <Feather
              name="map-pin"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          {item.icon === "cocktail" && (
            <MaterialIcons
              name="local-bar"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          {item.icon === "table" && (
            <MaterialIcons
              name="table-restaurant"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          <View style={tw`flex-1`}>
            <Text style={tw`font-bold text-lg mb-2`}>{item.title}</Text>
            <Text style={tw`text-gray-600`}>{item.description}</Text>
          </View>
        </View>
      )}
    />
  </View>
  </ScrollView>
);

const PhotoScreen = () => (
  <ScrollView style={tw`p-4`}>
    <View style={[tw`p-4 bg-white mt-4`]}>
      <Text style={[tw`text-xl font-semibold text-gray-800 mb-2`]}>Photos</Text>
      <ScrollView horizontal>
        {business.photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo }}
            style={[tw`w-40 h-40 rounded-md mr-4`]}
          />
        ))}
      </ScrollView>
    </View>
  </ScrollView>
);

const ReviewsScreen = () => (
  <ScrollView style={tw`p-4`}>
    <Text>Content for Services tab</Text>
  </ScrollView>
);

const InformationScreen = () => (
  <ScrollView style={tw`p-2`}>
    <View style={tw`bg-white p-4 rounded-lg shadow`}>
      <Text style={tw`text-xl font-semibold text-orange-300 mb-2`}>
        Contact Details
      </Text>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Website:</Text>
          <Text style={tw`text-base text-gray-500`}>{business.website}</Text>
        </View>
        <MaterialCommunityIcons
          name="web"
          size={20}
          color="black"
          style={tw`mr-2`}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Email:</Text>
          <Text style={tw`text-base text-gray-500`}>{business.email}</Text>
        </View>
        <FontAwesome name="envelope" size={20} color="black" style={tw`mr-2`} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Phone:</Text>
          <Text style={tw`text-base text-gray-500`}>{business.phone}</Text>
        </View>
        <FontAwesome name="phone" size={20} color="black" style={tw`mr-2`} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Address:</Text>
          <Text style={tw`text-base text-gray-500`}>{business.address}</Text>
        </View>
        <FontAwesome
          name="map-marker"
          size={20}
          color="black"
          style={tw`mr-2`}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Direction:</Text>
          <Text style={tw`text-base text-gray-500`}></Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Features:</Text>
          <Text style={tw`text-base text-gray-500`}>{business.opening_hours}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 my-3 `}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Hours:</Text>
          <Text style={tw`text-base text-gray-500`}>{business.opening_hours}</Text>
        </View>
        <FontAwesome
          name="calendar-times-o"
          size={20}
          color="black"
          style={tw`mr-2`}
        />
      </TouchableOpacity>
    </View>
    <View style={tw`bg-white p-4 rounded-lg shadow mt-4`}>
      <Text style={tw`text-xl font-semibold text-orange-300 mb-2`}>
        Description
      </Text>
      <Text style={tw`text-base text-gray-700`}>{business.description}</Text>
    </View>
  </ScrollView>
);

// Define other screens for Photos, Reviews, Followers, etc.

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={tw`bg-orange`}
    style={tw`bg-white shadow-md`}
    scrollEnabled
    tabStyle={tw`w-auto`}
    renderLabel={({ route, focused }) => (
      <Text
        style={tw`m-2 text-base ${focused ? "text-black" : "text-gray-500"}`}
      >
        {route.title}
      </Text>
    )}
  />
);

const renderScene = SceneMap({
  services: ServicesScreen,
  information: InformationScreen,
  photos: PhotoScreen,
  reviews: ReviewsScreen,
  // Add other scenes for Photos, Reviews, Followers, etc.
});

const BusinessProfilePage = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "services", title: "Services" },
    { key: "information", title: "Information" },
    { key: "photos", title: "Photos" },
    { key: "reviews", title: "Reviews" },
    // Add other routes for Photos, Reviews, Followers, etc.
  ]);

  return (
    <View style={tw`flex-1`}>
      <ScrollView style={tw`flex-1 h-[1]`} className="">
        <Header />
      </ScrollView>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderPager={(props) => <PagerView {...props} />}
      />
    </View>

    // <View className="flex-1 flex">
    //   <ParallaxScrollView
    //     className="flex-1 "
    //     // styles={{ flex: 1 }}
    //     backgroundColor="[#F6D8BD]"
    //     scrollEnabled={true}
    //     parallaxHeaderHeight={300}
    //     renderBackground={() => (
    // <ImageBackground
    //   className="w-screen top-0 h-[300] "
    //   // style={{ backgroundColor: "white" }}
    //   source={require("../../assets/Images/HomeBG.jpg")}
    //   resizeMode="cover"
    //       // >
    //       <View
    //         style={{
    //           height: 300,
    //           // flex: 1,
    //           // alignItems: "center",
    //           justifyContent: "center",
    //           top: 120,
    //         }}
    //       ></View>
    //       // </ImageBackground>
    //     )}
    //     renderForeground={() => (

    //        <Header />

    //     )}
    //   >
    //     <Header />
    //     <TabView
    //       navigationState={{ index, routes }}
    //       renderScene={renderScene}
    //       renderTabBar={renderTabBar}
    //       onIndexChange={setIndex}
    //       initialLayout={{ width: Dimensions.get("window").width }}
    //       renderPager={(props) => <PagerView {...props} />}
    //     />
    //   </ParallaxScrollView>
    // </View>
  );
};

export default BusinessProfilePage;
