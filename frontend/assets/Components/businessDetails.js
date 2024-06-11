import React, {useState} from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
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
    photo: require("../Images/Home.jpg"), // Use URL for online images
    user: {
      id: 2,
      username: "@user2",
      avatar: "../Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg", // Use URL for online images
    },
    likes: 5,
    liked: false,
    comments: [],
  },
  // Add more dummy reviews as needed
];

const ReviewItem = ({ item }) => {
  // const [likes, setLikes] = useState(item.likes);
  // const [liked, setLiked] = useState(item.liked);
  const {title,description,user}=item
  console.log('these are the review itmes: ',title, "   ",description,"  ",user)
  


  

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (newComment.trim().length > 0) {
      // Find the review by id and add the new comment
      const reviewIndex = dummyReviews.findIndex(
        (review) => review.id === item.id
      );
      if (reviewIndex !== -1) {
        dummyReviews[reviewIndex].comments.push({
          id: dummyReviews[reviewIndex].comments.length + 1,
          user: {
            id: 4, // Example user id for the new comment
            username: "@newCommenter", // Example username for the new comment
          },
          text: newComment,
        });
        setNewComment(""); // Clear the input field after adding the comment
      }
    }
  };

  const renderComment = ({ item }) => (
    <View style={tw`flex-row items-center my-2 `}>
      <Text style={tw`font-bold mr-2`}>{item.user.username}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={tw`bg-white rounded-2xl p-4 shadow-md border border-gray-100 mb-6`}>
      <View style={tw`flex-row items-center mb-2`}>
        {/* <Image
          source={
            typeof item.user.avatar === "string"
              ? { uri: item.user.avatar }
              : item.user.avatar
          }
          style={tw`w-8 h-8 rounded-full mr-2`}
        /> */}
        <Text style={tw`font-bold text-lg`}>{item.title}</Text>
      </View>
      <Image
        source={
          typeof dummyReviews[0].photo === "string" ? { uri: dummyReviews[0].photo } : item.photo
        }
        style={tw`w-full h-40 mb-2 w-70 ml-4`}
        resizeMode="cover"
      />
      <Text style={tw`mb-2 text-center text-base`}>{item.description}</Text>
      {/* <View style={tw`flex-row items-center justify-center my-3`}>
        <TouchableOpacity onPress={handleLike}>
          <View style={tw`items-center justify-center`}>
            <FontAwesome
              name="thumbs-up"
              size={24}
              color={liked ? "orange" : "gray"}
              style={tw`mr-1`}
            />
            <Text>{likes} Helpfull</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike}>
          <View style={tw` items-center justify-center ml-5`}>
            <FontAwesome
              name="thumbs-down"
              size={24}
              color={liked ? "orange" : "gray"}
              style={tw`mr-1`}
            />
            <Text>{likes} Not Helpfull</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={item.comments}
        renderItem={renderComment}
        keyExtractor={(comment) => comment.id.toString()}
      />

      <View style={tw`flex-row items-center mt-2`}>
        <TextInput
          style={tw`border border-gray-300 p-2 flex-1 mr-2`}
          placeholder="Add a comment"
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Text style={tw`text-orange-500`}>Post</Text>
        </TouchableOpacity>
       </View> */}
    </View>
  );
};

const Reviews = ({Reviews}) => (
  <View style={tw`p-1`}>
    <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
      <Text style={tw`text-xl font-semibold text-orange-300 mb-2`}>
        Leave a review
      </Text>
      <TextInput
        style={tw`border border-gray-300 p-2 flex-1 mr-2 mt-4`}
        placeholder="Add a review"
        // value={}
        // onChangeText={}
      />
      <Text style={tw`text-base text-gray-700 text-center`}>Tab to leave a review</Text>
    </View>
    <View style={tw`bg-white p-3 rounded-lg shadow`}>
      <Text style={tw`text-xl font-semibold text-orange-300 mb-2`}>
        Recommanded Reviews
      </Text>

      <FlatList
        data={Reviews}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={(item) => item._id.toString()}
      />
      <TouchableOpacity
        style={tw`bg-orange-400 rounded-2xl h-12 items-center justify-center mb-4 w-80  mt-4`}
        // onPress={handleSubmit}
      >
        <Text
          className={{ fontFamily: "berlin-sans" }}
          style={tw`text-white font-bold`}
        >
          More reviews
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);


// Dummy data for services
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
const Services = () => (
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
const dummyPhotos = [
  { id: "1", url: require("../Images/Home.jpg") },
  {
    id: "2",
    url: require("../Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg"),
  },
  { id: "3", url: require("../Images/Home.jpg") },
  { id: "4", url: require("../Images/Home.jpg") },
  {
    id: "5",
    url: require("../Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg"),
  },
  {
    id: "6",
    url: require("../Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg"),
  },
  { id: "7", url: require("../Images/Home.jpg") },
  { id: "8", url: require("../Images/Home.jpg") },
  { id: "9", url: require("../Images/Home.jpg") },
  { id: "10", url: require("../Images/Home.jpg") },
];

const Pictures = () => (
  <View style={tw`p-2 flex-1 bg-white rounded-xl shadow`}>
    <FlatList
      data={dummyPhotos}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <Image source={item.url} style={tw`w-1/2 h-35 rounded-lg`} />
      )}
      contentContainerStyle={tw`px-2`}
    />
  </View>
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
