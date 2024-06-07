import React, { useState, useEffect, useContext } from "react";
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
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";
import { FontAwesome, Feather } from "@expo/vector-icons";
import api from "../util/Util";
import { AuthContext } from "../context/AuthContext";
import { SelectList } from "react-native-dropdown-select-list";
import { StarRating } from "../assets/Components/starRating";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddReview = ({ navigation,route}) => {
  const [review, setReview] = useState({
    title: "",
    description: "",
  });

  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const {userId}=useContext(AuthContext)
  const [businesses,setBusinesses]=useState([])
  const [businessId,setBusinessId]=useState('')
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const {inBusiness,business_id}=route.params

  useEffect(() => {
    setBusinessId(business_id)
    const fetchBusinesses = async () => {
      await api
        .get("business/fetch-all")
        .then((res) => {
          const data = res.data;
          if (data.success) {
            setBusinesses(data.businesses);
            setSearchResults(data.businesses);
          } else {
            console.log(data.message);
          }
        })
        .catch((error) => {
          console.log("error in fetchBusinesses in AddReview: ", error.message);
        });
    };
    fetchBusinesses();
  }, []);

  useEffect(()=>{
    
    const fetchBusinesses=async()=>{

      console.log('mi in sahsd')
      const user=await AsyncStorage.getItem('userId')
      const token=await AsyncStorage.getItem('userToken')
      console.log('this is the id of the user  ',userId)
      console.log('this is the tokem of the user  ',token)


      // setUserId(user)
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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

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
      setImages((prevImages) => [...prevImages, pickedImage]);
    }
  };

  const handleChange = (name, value) => {
    setReview((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const removeImage = (uri) => {
    setImages((prevImages) => prevImages.filter((image) => image !== uri));
  };

  const submitReview = async () => {

    console.log('review ',review,"rating ",rating,"businessId :",businessId,"userId ",userId)
    if (!review && !rating) {
      Alert.alert("Error", "Please provide a review or rating.");
      return;
    }

    console.log("Review submitted:",  review );
    console.log('this is the businessId: ', businessId)
    console.log('this is the userId: ', userId)
    if(review.description){
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

    }else{
      return Alert.alert('enter a review description')
    }

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
  console .log('rating is more than 0')
await api.post('rating/create',{rating,userId,businessId})
.then((res)=>{

  if(res.success){

    Alert.alert("you have successfully rated the business")
    

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
navigation.navigate('Home')


    // Clear the form
    setReview("");
    setRating("");
    setImages([]);
    navigation.goBack();
  };

  // const StarRating = () => {
  //   return (
  //     <View style={tw`flex-row items-center mb-4`}>
  //       <Text style={tw`text-base`}>Rate:</Text>
  //       {[1, 2, 3, 4, 5].map((star) => (
  //         <TouchableOpacity key={star} onPress={() => setRating(star)}>
  //           <FontAwesome
  //             name={star <= rating ? "star" : "star-o"}
  //             size={30}
  //             color={star <= rating ? "orange" : "gray"}
  //             style={tw`mx-1`}
  //           />
  //         </TouchableOpacity>
  //       ))}
  //     </View>
  //   );
  // };
  
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

  const handleSelectItem = (val) => {
    const selected = businesses.find(
      (business) => business._id.toString() === val
    );
    console.log('this is the value of selected business: ',selected)
    if (selected) {
      setSelectedBusiness(selected.business_name);
      setBusinessId(selected._id);
    }
  };

  const data = searchResults.map((item) => ({
    key: item._id.toString(),
    value: item.business_name,
  }));

  return (
    <ScrollView style={tw`flex-1 p-4 m-3`}>
      <Text
        style={[tw`text-2xl font-bold mb-4`, { fontFamily: "berlin-sans" }]}
      >
        Add Review
      </Text>

      <View style={tw`m-3 items-center`}>
        
          {/* <FontAwesome name="search" size={20} color="lightgray" /> */}
          {!inBusiness&&
          <View style={tw` flex flex-row items-center`}>
          <SelectList
            setSelected={handleSelectItem}
            data={data}
            save="key"
            placeholder="Search for business.."
            search={true}
            inputStyles={tw`text-base text-black`}
            dropdownTextStyles={tw`text-base text-black`}
            boxStyles={tw`w-80 bg-white rounded-2xl`}
          />
        </View>
          }
          
          
        {selectedBusiness && (
          <View style={tw`flex-1 flex-row`}>
            <Text
              style={[
                tw`text-2xl font-bold my-4 `,
                { fontFamily: "berlin-sans" },
              ]}
            >
              Leave a Review for:
            </Text>
            <Text
              style={[
                tw`text-2xl font-bold my-4 ml-2 text-orange-400`,
                { fontFamily: "berlin-sans" },
              ]}
            >
              {selectedBusiness}
            </Text>
          </View>
        )}
      </View>

      <TextInput
        style={tw`border p-3 mb-4 rounded-xl bg-white `}
        placeholder="Write your review title..."
        name="title"
        value={review.title}
        onChangeText={(text) => handleChange("title", text)}
        multiline
      />

      <TextInput
        style={[tw`border p-2 mb-4 rounded-xl bg-white `, { height: 100 }]}
        placeholder="Write your review..."
        name="description"
        value={review.description}
        onChangeText={(text) => handleChange("description", text)}
        multiline
      />
      <StarRating rating={rating} setRating={setRating}/>

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
    </ScrollView>
  );
};

export default AddReview;
