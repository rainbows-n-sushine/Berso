import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ParallaxScrollView from "../assets/Components/ParallaxScrollView";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import {
  Services,
  Info,
  Pictures,
  Reviews,
  MoreLikeThis,
} from "../assets/Components/businessDetails.js";

const dummyPost = {
  profileImage: "../assets/Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg",
  name: "Awesome Restaurant",
  rating: 4.7,
  reviewnumber: 80,
  category: "Restaurant",
  about: "This is a great restaurant with a variety of delicious foods.",
  allAbout: [
    { category: "Services", id: 1 },
    { category: "Info", id: 2 },
    { category: "Pictures", id: 3 },
    { category: "Reviews", id: 4 },
    { category: "More like this", id: 5 },
  ],
};

const dummyData = [
  {
    title: "Services",
    data: Services(),
  },
  {
    title: "Info",
    data: Info(),
  },
  {
    title: "Pictures",
    data: Pictures(),
  },
  {
    title: "Reviews",
    data: Reviews(),
  },
  {
    title: "More like This",
    data: MoreLikeThis(),
  },
];

const BusinessPage = () => {
  const navigation = useNavigation();
  const [headerIconColor, setHeaderIconColor] = useState("white");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000); // Replace with actual data fetching logic
  }, []);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;

    if (scrollPosition > 80) {
      setHeaderIconColor("black");
      opacity.value = withTiming(1);
    } else {
      setHeaderIconColor("white");
      opacity.value = withTiming(0);
    }
  };

  const ratingStyle = {
    color: dummyPost.rating < 4.5 ? "black" : "#FF8C00",
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: "white",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`w-10 h-10 rounded-full justify-center items-center`}
        >
          <Ionicons name="arrow-back" size={24} color={headerIconColor} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={tw`flex-row justify-center items-center space-x-2`}>
          <TouchableOpacity
            style={tw`w-10 h-10 rounded-full justify-center items-center`}
          >
            <Ionicons name="share-outline" size={24} color={headerIconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-10 h-10 rounded-full justify-center items-center`}
          >
            <Ionicons name="search-outline" size={24} color={headerIconColor} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [headerIconColor]);

  const renderTabButton = (item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => setActiveTabIndex(index)}
      style={[
        tw`px-2 py-1 bg-orange-100`,
        activeTabIndex === index && tw``,
      ]}
    >
      <Text
        style={[
          tw`text-base`,
          activeTabIndex === index && tw`font-bold text-orange-300`,
        ]}
      >
        {item.category}
      </Text>
    </TouchableOpacity>
  );

  if (!isReady) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <ParallaxScrollView
        style={tw`flex-1`}
        backgroundColor="white"
        parallaxHeaderHeight={370}
        renderBackground={() => (
          <Image
            style={tw`w-full h-full opacity-86`}
            source={require("../assets/Images/HomeBG.jpg")}
            resizeMode="cover"
          />
        )}
        renderForeground={() => (
          <View className="flex-1 ">
            <View
              style={tw`absolute bg-transparent rounded-xl top-30 left-3 flex-row justify-between p-2 items-center`}
            >
              <FontAwesome5 name="font" size={35} color="yellow" />
              <View style={tw` justify-between pr-2 ml-2`}>
                <Text
                  // style={{ fontFamily: "berlin-sans" }}
                  style={tw`text-white text-lg font-bold`}
                >
                  {dummyPost.name}
                </Text>
                <Text
                  // style={{ fontFamily: "berlin-sans" }}
                  style={tw`text-slate-300 text-sm`}
                >
                  {dummyPost.category}
                </Text>
              </View>
            </View>

            <View style={tw`bg-white rounded-t-3xl top-48`}>
              <View style={tw`m-6`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <View style={tw`flex-row items-center flex-1`}>
                    <FontAwesome
                      name="star"
                      size={17}
                      color={ratingStyle.color}
                    />
                    <FontAwesome
                      name="star"
                      size={17}
                      color={ratingStyle.color}
                    />
                    <FontAwesome
                      name="star"
                      size={17}
                      color={ratingStyle.color}
                    />
                    <FontAwesome
                      name="star"
                      size={17}
                      color={ratingStyle.color}
                    />
                    <FontAwesome name="star" size={17} color="gray" />
                    <Text style={tw`ml-1 font-bold text-lg`}>
                      {dummyPost.rating}
                    </Text>
                  </View>
                  <View style={tw`items-end`}>
                    <Text style={tw`ml-1 font-base text-lg`}>
                      ({dummyPost.reviewnumber})reviews
                    </Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center mt-2`}>
                  <Ionicons name="bicycle" size={18} color="black" />
                  <Text style={tw`ml-1 text-sm text-gray-900`}>Delivery</Text>
                  <Text>・</Text>
                  <FontAwesome5 name="walking" size={15} color="black" />
                  <Text style={tw`ml-1 text-sm text-gray-900`}>Pickup</Text>
                  <Text>・</Text>
                  <Text style={tw`font-bold text-sm`}>More Info</Text>
                  <AntDesign
                    name="right"
                    size={14}
                    color="black"
                    style={tw`ml-1`}
                  />
                </View>
              </View>
              <View className="flex-row mb-7 mt-2 justify-between items-center px-4">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddReview");
                  }}
                >
                  <View className="items-center mx-2">
                    <MaterialCommunityIcons
                      name="comment-edit-outline"
                      size={20}
                      color="black"
                    />
                    <Text className="text-base">Add Review</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("AddBusiness");
                  }}
                >
                  <View className="items-center  mx-2">
                    <Feather name="phone" size={20} color="black" />
                    <Text className="text-base">Call</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("AddBusiness");
                  }}
                >
                  <View className="items-center mx-2">
                    <Feather name="map-pin" size={20} color="black" />
                    <Text className="text-base">View map</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("AddBusiness");
                  }}
                >
                  <View className="items-center mx-2">
                    <MaterialCommunityIcons
                      name="web"
                      size={20}
                      color="black"
                    />
                    <Text className="text-base">Visit website</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        stickyHeaderHeight={30}
        contentBackgroundColor="#EAE2DA"
        // renderStickyHeader={() => (
        //   <View
        //     style={tw`flex-row justify-between items-center mb-4 top-4 mx-2`}
        //   >
        //     <TouchableOpacity
        //       onPress={() => {
        //         navigation.goBack();
        //       }}
        //     >
        //       <AntDesign name="arrowleft" size={24} color="black" />
        //     </TouchableOpacity>
        //   </View>
        // )}
        scrollEvent={handleScroll}
      >
        <View style={tw`flex-1 bg-white rounded-t-3xl `}></View>
        <View style={tw`flex-1 rounded-b-3xl`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dummyPost.allAbout.map((item, index) =>
              renderTabButton(item, index)
            )}
          </ScrollView>
          <View style={tw`flex-1 mt-3 bg-white rounded-t-xl `}>
            {/* Only render the content of the active tab */}
            {dummyData[activeTabIndex] && (
              <SectionContent section={dummyData[activeTabIndex]} />
            )}
          </View>
        </View>
      </ParallaxScrollView>
      {/* <Animated.View
        style={[tw`absolute h-12 left-0 right-0 bottom-0`, animatedStyles]}
      >
        <View style={tw`justify-center pt-2 bg-white`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-4 items-center space-x-2`}
          >
            {dummyPost.allAbout.map((item, index) =>
              renderTabButton(item, index)
            )}
          </ScrollView>
        </View>
      </Animated.View> */}
    </View>
  );
};

const SectionContent = ({ section }) => (
  <View style={tw`pt-4 pl-4 pr-1`}>
    <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>
      {section.title}
    </Text>
    {/* Render the content returned by the function */}
    {section.data}
  </View>
);

export default BusinessPage;
