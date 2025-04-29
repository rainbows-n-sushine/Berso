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
import ParallaxScrollView from "../../assets/Components/ParallaxScrollView";
import { ImageBackground } from "react-native";
import api from "../../util/Util";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Services from "./Components/Services";
import PhotoScreen from "./Components/PhotosScreen";
import ServicesScreen from "./Components/ServicesScreen";
import InformationScreen from "./Components/InformationScreen"
import ReviewsScreen from "./Components/ReviewsScreen";










// Define other screens for Photos, Reviews, Followers, etc.


// const renderScene = SceneMap({
//   services: ServicesScreen,
//   information: InformationScreen,
//   photos: PhotoScreen,
//   reviews: ReviewsScreen,
//   // Add other scenes for Photos, Reviews, Followers, etc.
// });



const BusinessProfilePage = () => {

  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "services", title: "Services" },
    { key: "information", title: "Information" },
    { key: "photos", title: "Photos" },
    { key: "reviews", title: "Reviews" },
    // Add other routes for Photos, Reviews, Followers, etc.
  ]);

  const [businessFetched,setBusinessFetched]=useState({})
  const [reviewFetched,setReviewFetched]=useState({})
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
  const getReview=async()=>{

    const businessId=await AsyncStorage.getItem('currentBusiness')

    console.log('this is the current bsiness in get review', businessId)
    api.get(`review/fetch-all-reviews-for-business/${businessId}`)


    .then((res)=>{
      console.log(res.data.message)
      console.log('these r the reviews in get Rendbv',res.data.reviews)

      if(res.data.success){
        setIndex(res.data.reviews)

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
    //  businessFetched=_business
    setBusinessFetched(_business)
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
      const  categoryFetched=res.data.categories
      setCa


      }
    })
    .catch((error)=>{
if(error){
  console.log(error.message)
}

    })} }


useEffect(()=>{

  getBusinessInfo()
  fetchCategories()
  getReview() 


  

},[])


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
  services: () => <ServicesScreen businessFetched={businessFetched} />,
  information: () => <InformationScreen businessFetched={businessFetched} />,
  photos: () => <PhotoScreen businessFetched={businessFetched} />,
  reviews: () => <ReviewsScreen reviewFetched={reviewFetched} />,
  
});

  return (
    <View style={tw`flex-1`}>
      <ScrollView style={tw`flex-1 h-[1]`} className="">
        <Services />
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
