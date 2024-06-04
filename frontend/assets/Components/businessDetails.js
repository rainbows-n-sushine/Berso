import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
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
const dummyPost = {
  profileImage: "../assets/Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg",
  name: "Awesome Restaurant",
  rating: 4.7,
  reviewnumber: 80,
  email: "business@gmail.com",
  phone: 911111111,
  address: "Addis Ababa",
  features: "delivery ",
  hours: "Mon-Fri: 9am-10pm",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec interdum leo.",
  photos: [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
    "https://example.com/photo3.jpg",
  ],
  website: "business.com",
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

const dummyReviews = [
  {
    id: 1,
    text: "This place is awesome!",
    photo: require("../Images/Home.jpg"), // Use require for local images
    user: {
      id: 1,
      username: "@user1",
      avatar: require("../Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg"), // Use require for local images
    },
    likes: 10,
  },
  {
    id: 2,
    text: "Great experience!",
    photo: require("../Images/Home.jpg"), // Use URL for online images
    user: {
      id: 2,
      username: "@user2",
      avatar: "../Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg", // Use URL for online images
    },
    likes: 5,
  },
  // Add more dummy reviews as needed
];

const handleLike = (reviewId) => {
  // Implement your like functionality here, e.g., send a request to the backend
  console.log("Liked review with ID:", reviewId);
};

const renderItem = ({ item }) => (
  <View style={tw`p-4 border-b border-gray-300`}>
    <View style={tw`flex-row items-center mb-2`}>
      <Image
        source={
          typeof item.user.avatar === "string"
            ? { uri: item.user.avatar }
            : item.user.avatar
        }
        style={tw`w-8 h-8 rounded-full mr-2`}
      />
      <Text style={tw`font-bold`}>{item.user.username}</Text>
    </View>
    <Image
      source={typeof item.photo === "string" ? { uri: item.photo } : item.photo}
      style={tw`w-full h-40 mb-2`}
      resizeMode="cover"
    />
    <Text style={tw`mb-2`}>{item.text}</Text>
    <TouchableOpacity onPress={() => handleLike(item.id)}>
      <View style={tw`flex-row items-center`}>
        <Feather name="thumbs-up" size={20} color="blue" style={tw`mr-1`} />
        <Text>{item.likes}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const Reviews = () => (
  <View style={tw`p-4 bg-white`}>
    <FlatList
      data={dummyReviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  </View>
);


const Services = () => (
  <ScrollView style={tw`p-4`}>
    <View
      style={tw`flex-row justify-between items-center p-4 border-b border-gray-300`}
    >
      <Text>Spring Rolls</Text>
    </View>
    <View
      style={tw`flex-row justify-between items-center p-4 border-b border-gray-300`}
    >
      <Text>Garlic Bread</Text>
    </View>
  </ScrollView>
);

const Info = () => (
  <View style={tw`p-2`}>
    <View style={tw`bg-white p-4 rounded-lg shadow`}>
      <Text style={tw`text-xl font-semibold text-orange-300 mb-2`}>
        Contact Details
      </Text>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Website:</Text>
          <Text style={tw`text-base text-gray-500`}>{dummyPost.website}</Text>
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
          <Text style={tw`text-base text-gray-500`}>{dummyPost.email}</Text>
        </View>
        <FontAwesome name="envelope" size={20} color="black" style={tw`mr-2`} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Phone:</Text>
          <Text style={tw`text-base text-gray-500`}>{dummyPost.phone}</Text>
        </View>
        <FontAwesome name="phone" size={20} color="black" style={tw`mr-2`} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Address:</Text>
          <Text style={tw`text-base text-gray-500`}>{dummyPost.address}</Text>
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
          <Text style={tw`text-base text-gray-500`}>{dummyPost.hours}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 my-3 `}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Hours:</Text>
          <Text style={tw`text-base text-gray-500`}>{dummyPost.hours}</Text>
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
      <Text style={tw`text-base text-gray-700`}>{dummyPost.description}</Text>
    </View>
  </View>
);

const Pictures = () => (
  <ScrollView style={tw`p-4`}>
    <View
      style={tw`flex-row justify-between items-center p-4 border-b border-gray-300`}
    >
      <Text>Ice Cream</Text>
    </View>
    <View
      style={tw`flex-row justify-between items-center p-4 border-b border-gray-300`}
    >
      <Text>Brownie</Text>
    </View>
  </ScrollView>
);


const MoreLikeThis = () => (
  <ScrollView style={tw`p-4`}>
    <View
      style={tw`flex-row justify-between items-center p-4 border-b border-gray-300`}
    >
      <Text>Ice Cream</Text>
    </View>
    <View
      style={tw`flex-row justify-between items-center p-4 border-b border-gray-300`}
    >
      <Text>Brownie</Text>
    </View>
  </ScrollView>
);

export { Services, Info, Pictures, Reviews, MoreLikeThis };
