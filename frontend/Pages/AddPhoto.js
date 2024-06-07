import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { AuthContext } from "../context/AuthContext";
import api from "../util/Util";

const AddPhoto = ({ route }) => {
  const [images, setImages] = useState([]);
  const { userId } = useContext(AuthContext);
  const [businesses, setBusinesses] = useState([]);
  const [businessId, setBusinessId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");

  const inBusiness = route?.params?.inBusiness || false;
  const business_id = route?.params?.business_id || "";

  useEffect(() => {
    if (business_id) {
      setBusinessId(business_id);
    }
    const fetchBusinesses = async () => {
      try {
        const res = await api.get("business/fetch-all");
        const data = res.data;
        if (data.success) {
          setBusinesses(data.businesses);
          setSearchResults(data.businesses);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("error in fetchBusinesses in AddPhoto: ", error.message);
      }
    };
    fetchBusinesses();
  }, [business_id]);

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

  const removeImage = (uri) => {
    setImages((prevImages) => prevImages.filter((image) => image !== uri));
  };

  const submitPhotos = async () => {
    if (!selectedBusiness && !inBusiness) {
      Alert.alert("Error", "Please select a business.");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Error", "Please select at least one photo.");
      return;
    }

    console.log("Photos submitted:", images);
    console.log("Business ID:", businessId);
    console.log("User ID:", userId);

    try {
      const res = await api.post("photos/add", { images, userId, businessId });
      if (res.data.success) {
        Alert.alert("Success", "Photos submitted successfully.");
        setImages([]);
      } else {
        Alert.alert("Error", res.data.message);
      }
    } catch (error) {
      console.log("Error submitting photos:", error.message);
      Alert.alert("Error", "There was an error submitting your photos.");
    }
  };

  const handleSelectItem = (val) => {
    const selected = businesses.find(
      (business) => business._id.toString() === val
    );
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
        Add Photos
      </Text>

      {!inBusiness && (
        <View style={tw`m-3 items-center`}>
          <View style={tw`flex flex-row items-center`}>
            <SelectList
              setSelected={handleSelectItem}
              data={data}
              save="key"
              placeholder="Search for business..."
              search={true}
              inputStyles={tw`text-base text-black`}
              dropdownTextStyles={tw`text-base text-black`}
              boxStyles={tw`w-80 bg-white rounded-2xl`}
            />
          </View>
        </View>
      )}

      {selectedBusiness && (
        <View style={tw`flex-1 flex-row`}>
          <Text
            style={[tw`text-2xl font-bold my-4`, { fontFamily: "berlin-sans" }]}
          >
            Add Photos for:
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

      <TouchableOpacity
        onPress={pickImage}
        style={tw`bg-slate-400 p-2 rounded-md mb-4`}
      >
        <Text style={tw`text-white text-center`}>Pick an image</Text>
      </TouchableOpacity>

      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={tw`relative w-40 h-40 m-2`}>
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
        onPress={submitPhotos}
        style={tw`bg-orange-400 p-2 rounded-xl`}
      >
        <Text style={tw`text-white text-center text-lg`}>Submit Photos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddPhoto;
