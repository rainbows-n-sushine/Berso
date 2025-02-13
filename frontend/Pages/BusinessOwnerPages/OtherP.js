import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PagerView from "react-native-pager-view";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";
import ParallaxScrollView from "../../assets/Components/ParallaxScrollView";
import { ImageBackground } from "react-native";
const business = {
  name: "Sample Restaurant",
  category: "Restaurant",
  rating: 4.5,
  email: "info@samplerestaurant.com",
  phone: "+1234567890",
  address: "123 Main Street, City, Country",
  hours: "Mon-Fri: 9am-10pm",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec interdum leo.",
  photos: [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
    "https://example.com/photo3.jpg",
  ],
};



const Header = () => {
  return (
    <View className='h-[300]'>
      <ImageBackground
        source={require("../../assets/Images/HomeBG.jpg")}
        style={tw`flex-1`}
        resizeMode="cover"
      >
        <View style={tw`flex-row items-center p-4 bg-white`}>
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
              <Text style={tw`font-bold text-lg`}>{business.name}</Text>
              <Text style={tw`text-gray-500`}>{business.category}</Text>
              <View style={tw`flex-row items-center`}>
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

const ServicesScreen = () => (
  <ScrollView style={tw`p-4`}>
    <Text>Content for Services tab</Text>
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
          <Text style={tw`text-base text-gray-500`}>{business.email}</Text>
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
          <Text style={tw`text-base text-gray-500`}>{business.hours}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 my-3 `}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Hours:</Text>
          <Text style={tw`text-base text-gray-500`}>{business.hours}</Text>
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
      <ScrollView className="h-[1]">
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

 