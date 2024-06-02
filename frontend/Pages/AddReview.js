import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";

const AddReview = ({ navigation }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitReview = () => {
    if (!review || !rating) {
      Alert.alert("Error", "Please provide a review and rating.");
      return;
    }

    
    console.log("Review submitted:", { review, rating, image });

    
    setReview("");
    setRating("");
    setImage(null);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Add Review</Text>

      <TextInput
        style={tw`border p-2 mb-4 rounded-xl `}
        placeholder="Write your review..."
        value={review}
        onChangeText={setReview}
        multiline
      />

      <TextInput
        style={tw`border p-2 mb-4 rounded-xl `}
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={pickImage}
        style={tw`bg-slate-400 p-2 rounded-md mb-4`}
      >
        <Text style={tw`text-white text-center`}>Pick an image (optional)</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={tw`w-full h-40 mb-4`}
          resizeMode="cover"
        />
      )}

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
