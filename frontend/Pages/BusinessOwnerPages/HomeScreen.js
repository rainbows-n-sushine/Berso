import { View, Text, Animated, Easing,TouchableOpacity} from "react-native";
import React,{useEffect,useState,useContext} from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import api from "../../util/Util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArtisticLineBackground from "../../components/animatedBg"

const HomeScreen = () => {
  const navigation = useNavigation();


  const {_businessOwnerId}=useContext(AuthContext)
  const {currentBusiness,setCurrentBusiness}=useState('')

  const[totalReviews,setTotalReviews]=useState(null)
  const[averageRating,setAverageRating]=useState(null)
  const[totalViews,setTotalViews]=useState(null)

    const getBusiness=async()=>{
 const businessId=await AsyncStorage.getItem('currentBusiness')
   await api.get(`business/get-one/${businessId}`)
   .then((res)=>{
    if(res.data.success){

      setAverageRating(res.data.business.average_rating)
      setTotalReviews(res.data.business.review_count)
      setTotalViews(234)


    }
   }).catch((error)=>{

    if(error){
      console.log('this is the erro in getBusiness: ',error.message)
    }
   })  

    }

  useEffect(()=>{
    getBusiness()

  },[])
  
   const data = [
    { label: 'Category 1', value: 20 },
    { label: 'Category 2', value: 40 },
    { label: 'Category 3', value: 60 },
    { label: 'Category 4', value: 80 },
    { label: 'Category 5', value: 100 },
  ];
  const scaleAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);



  return (
    <View style={[tw`flex-1 items-center justify-center`, tw`bg-orange-100`]}>
   {/* <TouchableOpacity
  onPress={() => {
    navigation.navigate('ProfileNavB');
  }}
>
  <Text style={tw`text-sm font-bold text-black mt-4`}>Go back</Text>
</TouchableOpacity> */}

      <ArtisticLineBackground/>
      <Text style={[tw`text-4xl font-bold text-black mb-8`]}>Dashboard</Text>

      {


      }

      <Animated.View
        style={[
          tw`bg-white rounded-lg p-6 shadow-xl mb-6`,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={[tw`text-lg font-semibold text-gray-800`]}>
          Total Views: {totalViews}
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          tw`bg-white rounded-lg p-6 shadow-xl mb-6`,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={[tw`text-lg font-semibold text-gray-800`]}>
          Total Reviews:  {totalReviews}
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          tw`bg-white rounded-lg p-6 shadow-xl mb-6`,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={[tw`text-lg font-semibold text-gray-800`]}>
          Average Rating:  {averageRating}
        </Text>
      </Animated.View>
      {/* <BarChart
        style={{ flex: 1 }}
        data={data}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </BarChart>  */}
      {/* {/* <LineChartComponent /> */}
      {/* Add more summary cards or widgets as needed */}
      {/* <View style={tw``}><ArtisticLineBackground/></View> */}
      
    </View>
  );
};

export default HomeScreen;
