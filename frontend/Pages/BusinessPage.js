import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SectionList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ParallaxScrollView from "../assets/Components/ParallaxScrollView";
import tw from "tailwind-react-native-classnames";

const dummyPost = {
  profileImage: "../assets/Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg",
  name: "Awesome Restaurant",
  rating: 4.7,
  about: "This is a great restaurant with a variety of delicious foods.",
  food: [
    { category: "Appetizers", id: 1 },
    { category: "Main Courses", id: 2 },
    { category: "Desserts", id: 3 },
  ],
};

const dummyData = [
  {
    title: "Appetizers",
    data: [
      { id: "1", name: "Spring Rolls" },
      { id: "2", name: "Garlic Bread" },
    ],
  },
  {
    title: "Main Courses",
    data: [
      { id: "3", name: "Grilled Chicken" },
      { id: "4", name: "Pasta" },
    ],
  },
  {
    title: "Desserts",
    data: [
      { id: "5", name: "Ice Cream" },
      { id: "6", name: "Brownie" },
    ],
  },
];

const BusinessPage = () => {
  const navigation = useNavigation();
  const [headerIconColor, setHeaderIconColor] = useState("white");
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
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

    dummyData.forEach((category, index) => {
      const sectionTop = index * 260;
      const sectionBottom = (index + 1) * 260;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        setActiveButtonIndex(index);
      }
    });

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
        parallaxHeaderHeight={200}
        renderBackground={() => (
          <Image
            style={tw`w-full h-full bg-white`}
            source={require("../assets/Images/HomeBG.jpg")}
            resizeMode="cover"
          />
        )}
        stickyHeaderHeight={20}
        contentBackgroundColor="#ecedef"
        // renderStickyHeader={() => (
        //   <View style={tw`justify-end ml-7 h-16`}>
        //     {/* <Text style={tw`text-2xl font-bold`}>{dummyPost.name}</Text> */}
        //   </View>
        // )}
        scrollEvent={handleScroll}
      >
        <View style={tw`flex-1 bg-white rounded-t-3xl `}>
          <View style={tw`m-6`}>
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-2xl font-bold text-gray-900`}>
                {dummyPost.name}
              </Text>
              <View style={tw`flex-row items-center`}>
                <FontAwesome name="star" size={17} color={ratingStyle.color} />
                <Text style={tw`ml-1 font-bold text-lg`}>
                  {dummyPost.rating}
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
            <View style={tw`h-[0.5px] bg-gray-400 my-4`} />
            <Text style={tw`text-sm text-gray-900`}>{dummyPost.about}</Text>
          </View>
        </View>
        <View style={tw`flex-1 bg-white mt-2 rounded-b-3xl`}>
          <SectionList
            sections={dummyData}
            scrollEnabled={false}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View style={tw`flex-row justify-between items-center p-4`}>
                <Text>{item.name}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={tw`border-b-[0.5px] border-gray-400`} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={tw`text-2xl font-bold text-gray-900 mt-2 ml-6`}>
                {title}
              </Text>
            )}
          />
        </View>
      </ParallaxScrollView>
      <Animated.View
        style={[tw`absolute h-12 left-0 right-0 bottom-0`, animatedStyles]}
      >
        <View style={tw`justify-center pt-2 bg-white`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-4 items-center space-x-2`}
          >
            {dummyPost.food.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveButtonIndex(index)}
                style={[
                  tw`px-2 py-1 rounded-full bg-gray-400`,
                  activeButtonIndex === index && tw`bg-blue-500`,
                ]}
              >
                <Text
                  style={[
                    tw`text-base`,
                    activeButtonIndex === index && tw`font-bold text-white`,
                  ]}
                >
                  {item.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
};

export default BusinessPage;
