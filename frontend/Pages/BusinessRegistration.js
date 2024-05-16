import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import tw from "twrnc";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import api from "../../util/Util";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BusinessRegistration = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [business, setBusiness] = useState({
    businessName: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    address: "",
    businessDays: "",
    openingHours: "",
    averagePrice: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [categoriesFetched, setCategoriesFetched] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "berlin-sans": require("../fonts/berlin-sans/BerlinSans.ttf"),
      });
    }

    async function getCategories() {
      console.log("Fetching categories");

      await api
        .get("category/fetchAll")
        .then((res) => {
          console.log(res.data.category);
          let allCategory = res.data.category;

          console.log("Fetched categories:", allCategory);
          const formattedCategories = allCategory.map((cat) => ({
            value: cat.name,
            key: cat._id,
          }));
          setCategoriesFetched(formattedCategories);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }

    getCategories();
    loadFonts();
  }, []);

  const handleChange = (name, value) => {
    setBusiness({ ...business, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(categories);
    const userId = await AsyncStorage.getItem("userId");
    console.log("Categories selected:", categories);
    console.log("Submitting business registration");
    console.log(business);

    await api
      .post("business/register-business", { business, categories, userId })
      .then((res) => {
        console.log("Registration successful:", res.data);
      })
      .catch((error) => {
        if (error) {
          console.log("Registration error:", error.message);
        }
      });
  };

  return (
    <View style={tw`flex-1 bg-white justify-center`}>
      <ScrollView style={{ height: windowHeight }}>
        <View style={tw`flex-1 p-4`}>
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{ fontFamily: "berlin-sans", fontSize: 35 }}
              className={`text-2xl font-bold mb-4 font-berlin-sans text-center py-2`}
            >
              Register Business
            </Text>
          </View>
          <View className="">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="p-10 items-center border-orange-300 border-8 rounded-2xl mb-5"
            >
              <Feather name="share" size={100} color="orange" />
            </TouchableOpacity>
            <View className="justify-center items-center">
              <View>
                <Text
                  style={{ fontFamily: "berlin-sans" }}
                  className="text-lg font-bold mb-4 berlinSans text-stone-700"
                >
                  Required Information
                </Text>
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Name of business"
                  onChangeText={(text) => {
                    handleChange("businessName", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Email"
                  onChangeText={(text) => {
                    handleChange("email", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Phone Number"
                  onChangeText={(text) => {
                    handleChange("phone", text);
                  }}
                />
                <MultipleSelectList
                  setSelected={(val) => {
                    setCategories(val);
                  }}
                  data={categoriesFetched}
                  label="Categories"
                  save="key"
                />
              </View>
              <View>
                <Text
                  style={{ fontFamily: "berlin-sans" }}
                  className="text-lg font-bold mb-4 berlinSans text-stone-700"
                >
                  Optional Details
                </Text>
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Website"
                  onChangeText={(text) => {
                    handleChange("website", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Location"
                  onChangeText={(text) => {
                    handleChange("location", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Address"
                  onChangeText={(text) => {
                    handleChange("address", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Business Days"
                  onChangeText={(text) => {
                    handleChange("businessDays", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Opening Hours"
                  onChangeText={(text) => {
                    handleChange("openingHours", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Average Price"
                  onChangeText={(text) => {
                    handleChange("averagePrice", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-40 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 pb-30 mb-4`}
                  placeholder="Description"
                  onChangeText={(text) => {
                    handleChange("description", text);
                  }}
                />
              </View>
              <TouchableOpacity
                style={tw`bg-orange-400 rounded-2xl h-12 items-center justify-center mb-4 w-80 mt-4`}
                onPress={handleSubmit}
              >
                <Text
                  className={{ fontFamily: "berlin-sans" }}
                  style={tw`text-white font-bold`}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BusinessRegistration;
