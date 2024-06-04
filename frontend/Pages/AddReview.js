import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
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
const AddReview = ({ navigation }) => {
  const [review, setReview] = useState({});
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [userId,setUserId]=useState('')
  const [businessId,setBusinessId]=useState('')


  useEffect(()=>{
 const getUserId=async()=>{

  const user=await AsyncStorage.getItem('userId')
  setUserId(user)
  console.log('tihs is the value of the userId: ',user)

}
    getUserId()

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

  const submitReview = async() => {
    if (!review || !rating) {
      Alert.alert("Error", "Please provide a review and rating.");
      return;
    }

    console.log("Review submitted:", { review, rating, images });
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


if(rating>0){
await api.post('rating/add',{rating,userId,businessId})
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
      <View style={tw`flex-row justify-center mb-4`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
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

  return (
    <SafeAreaView style={tw`flex-1 p-4 m-3`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Add Review</Text>

      <TextInput
        style={tw`border p-2 mb-4 rounded-xl `}
        placeholder="Write your review title..."
        name="title"
        preValue={review.title}
        onChangeText={(text)=>handleChange(text)}
        multiline
      />

      <TextInput
        style={tw`border p-2 mb-4 rounded-xl `}
        placeholder="Write your review..."
        name='description'
        value={review.description}
        onChangeText={(text)=>handleChange(text)}
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
