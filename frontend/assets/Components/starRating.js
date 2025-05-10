import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import tw from "twrnc";
import { FontAwesome, Feather } from "@expo/vector-icons";
const StarRating = ({rating,setRating}) => {
  //  const [rating, setRating] = useState(0);
    return (
      <View style={tw`flex-row items-center mb-4`}>
        <Text style={tw`text-base`}>Rate:</Text>
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



export { StarRating };
