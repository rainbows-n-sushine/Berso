import React, { useState, useEffect,useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import api from "../util/Util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import RNPickerSelect from "react-native-picker-select";
const AddReview = ({ navigation, onSeach, onSelectItem }) => {
  const [review, setReview] = useState({
    title:"",
    description:""
  });
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  // const {userId,isLoggedIn}=useContext(AuthContext)
  const [userId,setUserId]=useState('')
  const [businesses,setBusinesses]=useState([])
  const [businessId,setBusinessId]=useState('')
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const[selectedBusiness,setSelectedBusiness]=useState('')


  useEffect(()=>{
    
    const fetchBusinesses=async()=>{

      console.log('mi in sahsd')
      const user=await AsyncStorage.getItem('userId')
      const token=await AsyncStorage.getItem('userToken')
      console.log('this is the id of the user  ',userId)
      console.log('this is the tokem of the user  ',token)


      setUserId(user)
      await api.get('business/fetch-all')
      .then((res)=>{
        const data=res.data
        if(data.success){
          console.log('this is the businesses fetched',data.businesses)
          setBusinesses(data.businesses)


          setSearchResults(data.businesses)
          return  console.log(data.message)
        }
        console.log(data.message)

      })
      .catch((error)=>{
        console.log("error in fetchBusinesses in AddReview: ",error.message)

      })}
      fetchBusinesses();

  },[])



  
   
  const pickImage = async () => {
    // Ask for permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Open image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const pickedImage =
        result.assets && result.assets.length > 0
          ? result.assets[0].uri
          : result.uri;
      console.log("Image selected:", pickedImage); // Log the URI of the selected image
      setImages((prevImages) => [...prevImages, pickedImage]);
    }
  };

  const handleChange=(name,value)=>{
   console.log("this is the valeue in handle change" ,value)

    setReview((preValue)=>({

      ...preValue,[name]:value
        }))

  }

 

  const removeImage = (uri) => {
    setImages((prevImages) => prevImages.filter((image) => image !== uri));
  };


  //submits the review for the business we selected to review

  const submitReview = async() => {
    console.log('im in submit review')
    if (!review || !rating) {
      Alert.alert("Error", "Please provide a review and rating.");
      return;
    }

    console.log("Review submitted:",  review );
    console.log('this is the businessId: ', businessId)
    console.log('this is the userId: ', userId)
await api.post('review/add',{review,userId,businessId,images})
.then((res)=>{

  if(res.success){

    Alert.alert(res.data.message)
    

  }else{
    Alert.alert(res.data.message)
    
  }
})
.catch((error)=>{
  if(error){
    console.log(error)
  }
})
// if (images.length!==0){

//   await api.post('reviewImages/add',{images})
//   .then((res)=>{
//     console.log(res.data.message)
//     })
//     .catch((error)=>{
//       if(error){
//        console.log("this is the error in reviewImages: ",error.message) 

//       }})
// }


if(rating>0){
await api.post('rating/create',{rating,userId,businessId})
.then((res)=>{

  if(res.success){

    Alert.alert("you have successfully rated the business")
    navigation.navigate('Home')

  }else{
    Alert.alert(res.data.message)
    
  }
})
.catch((error)=>{
  if(error){
    console.log(error)
  }
})

}else{
  navigation.navigate('Home')
}



    // Clear the form
    setReview("");
    setRating("");
    setImages([]);
    navigation.goBack();
  };

  const StarRating = () => {
    return (
      <View style={tw`flex-row items-center mb-4`}>
        <Text style={tw`text-base`}>Rate:</Text>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() =>{
         console.log("this is the value of rating : ",star)
            setRating(star)
          } }>
            <FontAwesome
              name={star <= rating ? "star" : "star-o"}
              size={30}
              color={star <= rating ? "orange" : "gray"}
              style={tw`mx-1`}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }; 
  
  //search functions

  const  handleSearchTextChange=(text)=>{
    console.log('this is the search text :',searchText)
    console.log('this is teh searchResults: ',searchResults)
      
    const results=businesses.filter((business)=>(
      business.business_name.toLowerCase().includes(text.toLowerCase())
    ))
    setSearchResults(results)
    

  }
  
  const handleSearch = (text) => {
    const results = businesses.filter((business)=>(
      business.business_name.includes(text)
    ))
    setSearchResults(results);
  };

  const handleSelectItem = (item) => {
    console.log('you just selected: ',item.business_name)
     setSelectedBusiness(item.business_name)
     setBusinessId(item._id)
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4 m-3`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Add Review</Text>
      {/* <RNPickerSelect
        onValueChange={(value) => setBusinessId(value)}
        items={businesses.business_name}
        style={{
          inputIOS: tw`border p-2 mb-4 rounded-xl bg-white`,
          inputAndroid: tw`border p-2 mb-4 rounded-xl bg-white`,
        }}
        placeholder={{ label: "Select a business", value: null }}
      /> */}


         <View style={tw`m-3 items-center`}>
            <View style={tw`flex flex-row items-center`}>
              <FontAwesome name="search" size={20} color="lightgray" />
              <TextInput
              placeholder="Search for business.."
              value={searchText}
              onChangeText={(text)=>{
                console.log('this is the search results',searchResults)
                setSearchText(text)
                handleSearchTextChange(text)
              }} 
              style={tw`text-base font-bold text-[#dedddd] ml-2`}
              />
             
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectItem(item)}>
                    <Text>{item.business_name}</Text>
                  </TouchableOpacity>
                )}
              />
               <Button title="Search" onPress={handleSearch} />
               {selectedBusiness&&
                <Text>Review {selectedBusiness}</Text>
               }
              
              {/* <TextInput
                style={tw`text-base font-bold text-[#dedddd] ml-2 border-gray-300`}
                placeholder="Search for nearby restaurants,salons.."
                value={password}
                onChangeText={(text) => setPassword(text)}
              /> */}
            </View>
          </View>
      <TextInput
        style={tw`border p-2 mb-4 rounded-xl bg-white `}
        placeholder="Write your review title..."
        name="title"
        preValue={review.title}
        onChangeText={(text) => handleChange("title",text)}
        multiline
      />

      <TextInput
        style={[tw`border p-2 mb-4 rounded-xl  bg-white `, { height: 100 }]}
        placeholder="Write your review..."
        name="description"
        preValue={review.description}
        onChangeText={(text) => handleChange('description',text)}
        multiline
      />
      <StarRating />
      {/* <TextInput
        style={tw`border p-2 mb-4 rounded-xl`}
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={(text)=>setRating(text)}
        keyboardType="numeric"
      /> */}

      <TouchableOpacity
        onPress={pickImage}
        style={tw`bg-slate-400 p-2 rounded-md mb-4`}
      >
        <Text style={tw`text-white text-center`}>Pick an image (optional)</Text>
      </TouchableOpacity>

      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={tw`relative w-20 h-20 m-2`}>
            <Image
              source={{ uri: item }}
              style={tw`w-full h-full rounded`}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={tw`absolute -top-3 -right-2 p-1 rounded-full`}
              onPress={() => removeImage(item)}
            >
              <Feather name="x-circle" size={20} color="red" />
              {/* <Text style={tw`text-white text-xs`}>X</Text> */}
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        style={tw`mb-4`}
      />

      <TouchableOpacity
        onPress={submitReview}
        style={tw`bg-orange-400 p-2 rounded-xl`}
      >
        <Text style={tw`text-white text-center text-lg`}>Submit Review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddReview;
