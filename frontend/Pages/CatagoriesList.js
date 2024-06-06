import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import React,{useState,useEffect} from "react";
import tw from "twrnc";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from '../util/Util'
 
const CatagoriesList = () => {
     const navigation = useNavigation();
     const [categories, setCategories] = useState([]);
  // const categories = [
  //   { id: "1", name: "Category 1" },
  //   { id: "2", name: "Category 2" },
  //   { id: "3", name: "Category 3" },
  //   { id: "4", name: "Category 4" },
  //   { id: "5", name: "Category 5" },
  // ];
  useEffect(() => {
    const fetchCategories=async()=> {
      await api
        .get("category/fetchAll")
        .then((res) => {
          if (res.data.success) {
            let _categories = res.data.categories;
            setCategories(_categories);
            console.log('these r all the categories i have  ',_categories )
          } else {
            Alert.alert(res.data.message);
          }
        })
        .catch((error) => {
          if (error) {
            console.log("error in fetchCategories : ", error.message);
          }
        });
    }

    fetchCategories();
  }, []);
 
  const renderItem = ({ item }) => (
    
    <View style={tw`p-4 border-b border-gray-300`}>
      <TouchableOpacity onPress={()=>{

         navigation.navigate('BusinessList',{category:item})
      }

     
    }>
      <Text style={tw`text-lg`}>{item.name}</Text>
      </TouchableOpacity>
    </View>
    
  );


  return (
    <SafeAreaView style={tw`flex-1 bg-white p-4 `}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="angle-left" size={35} color="black" />
      </TouchableOpacity>
      <Text style={tw`text-xl font-bold text-center`}>All Catagories</Text>
      {/* {categories.map((category) => (
                    <TouchableOpacity
                      key={category._id}
                      onPress={() => {
                         
                        navigation.navigate("BusinessList", {
                          category: category,
                        });
                      }}
                    >
                      <View style={tw`items-center justify-center m-2 flex-1`}>
                      
                        8/<Text>im here too</Text>
                        <Text
                          style={tw`text-normal font-bold text-orange-400 mt-3`}
                        >
                          {category.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))} */}
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default CatagoriesList;
