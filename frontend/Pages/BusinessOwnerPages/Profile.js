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
<<<<<<< HEAD
=======
  TextInput,
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PagerView from "react-native-pager-view";
import { FontAwesome, MaterialCommunityIcons, Feather, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import ParallaxScrollView from "../../assets/Components/ParallaxScrollView";
import { ImageBackground } from "react-native";
import api from "../../util/Util";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
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


let businessFetched={};
let reviewFetched=[];
const Header = () => {
 
  
  // const [businessFetched,setBusinessFetched]=useState({
  //   business_name:" ",
  //   decription:" ",
  //   category:[],
  //   average_rating:0,
  //   website:" ",
  //   email:" ",
  //   phone:" ",
  //   opening_hours:" ",
  //   address:" "

  // })


useEffect(()=>{
// console.log('im in damnn ggahvsfbvskjfduyoyafvkhj,',businessFetched)

  

  const getReview=async()=>{

    const businessId=await AsyncStorage.getItem('currentBusiness')
<<<<<<< HEAD
    api.get(`review//fetch-all-reviews-for-business/${businessId}`)
    .then((res)=>{
      console.log(res.data.message)
=======

    console.log('this is the current bsiness in get review', businessId)
    api.get(`review/fetch-all-reviews-for-business/${businessId}`)


    .then((res)=>{
      console.log(res.data.message)
      console.log('these r the reviews in get Rendbv',res.data.reviews)
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

      if(res.data.success){
        reviewFetched=res.data.reviews

      }
    })
    .catch((error)=>{
if(error){
  console.log(error.message)
}

    })



  }
const getBusinessInfo=async()=>{
  console.log("this is the business in profile")
  const businessId= await AsyncStorage.getItem('currentBusiness')
  console.log('this is the id of the business ',businessId)

  await api.get(`business/get-one/${businessId}`)
 .then((res)=>{
  console.log(res.data)
  if(res.data.success){
    let _business=res.data.business
   businessFetched=_business
   console.log('this is the updated value of business Fetched, ',businessFetched)
   

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
  const fetchCategories=async()=>{
    const category=businessFetched.category
    if(category){
      console.log('im in damnxghzddx,',businessFetched)
    console.log('im in fetccennzbkdjgoaegvlakjbvn,nc,/m')
    await api.post(`business/get-categories`,{category})
    .then((res)=>{
      console.log(res.data.message)

      if(res.data.success){
        categoryFetched=res.data.categories

      }
    })
    .catch((error)=>{
if(error){
  console.log(error.message)
}

<<<<<<< HEAD
    })





    }
    


  }

  
  getReview()
  getBusinessInfo()
  fetchCategories()

=======
    })} }

  
 getReview() 
  getBusinessInfo()
  fetchCategories()
  
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

},[])



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
<<<<<<< HEAD
              // navigation.navigate("EditUserProfile");
=======
              navigation.navigate("EditProfile");
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
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
              <Text style={tw`font-bold text-lg`}>{businessFetched.business_name}</Text>
              <Text style={tw`text-gray-500`}>{businessFetched.category}</Text>
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
                  Rating: {businessFetched.average_rating}
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

const ServicesScreen = ({businessFetched}) => (
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

const PhotoScreen = ({business}) => (
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
<<<<<<< HEAD

const ReviewsScreen = ({businessFetched}) => (
  <ScrollView style={tw`p-4`}>
    <Text>Content for Services tab</Text>
=======
const dummyReviews = [
  {
    id: 1,
    text: "This place is awesome!",
    photo: require("../../assets/Images/Home.jpg"), // Use require for local images
    user: {
      id: 1,
      username: "@user1",
      avatar: require("../../assets/Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg"), // Use require for local images
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
    photo: require("../../assets/Images/Home.jpg"), // Use URL for online images
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


const ReviewsScreen = ({businessFetched}) => (
  <ScrollView style={tw`p-1`}>
    
    <View style={tw` p-3 rounded-md shadow`}>

      <FlatList
        data={dummyReviews}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
  </ScrollView>
);

const InformationScreen = ({businessFetched}) => (

  
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
        
          <Text style={tw`text-base text-gray-500`}>{businessFetched.website}</Text>
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
          <Text style={tw`text-base text-gray-500`}>{businessFetched.email}</Text>
        </View>
        <FontAwesome name="envelope" size={20} color="black" style={tw`mr-2`} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Phone:</Text>
          <Text style={tw`text-base text-gray-500`}>{businessFetched.phone}</Text>
        </View>
        <FontAwesome name="phone" size={20} color="black" style={tw`mr-2`} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Address:</Text>
          <Text style={tw`text-base text-gray-500`}>{businessFetched.address}</Text>
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
          <Text style={tw`text-base text-gray-500`}>{businessFetched.opening_hours}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 my-3 `}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Hours:</Text>
          <Text style={tw`text-base text-gray-500`}>{businessFetched.opening_hours}</Text>
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
      <Text style={tw`text-base text-gray-700`}>{businessFetched.description}</Text>
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

// const renderScene = SceneMap({
//   services: ServicesScreen,
//   information: InformationScreen,
//   photos: PhotoScreen,
//   reviews: ReviewsScreen,
//   // Add other scenes for Photos, Reviews, Followers, etc.
// });

const renderScene = SceneMap({
  services: () => <ServicesScreen businessFetched={businessFetched} />,
  information: () => <InformationScreen businessFetched={businessFetched} />,
  photos: () => <PhotoScreen business={business} />,
  reviews: () => <ReviewsScreen reviewFetched={reviewFetched} />,
  
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
