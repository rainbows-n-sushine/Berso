
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import tw from "twrnc";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const Profile = () => {
  const business = {
    name: "Sample Restaurant",
    category: "Restaurant",
    rating: 4.5,
    email: "info@samplerestaurant.com",
    phone: "+1234567890",
    address: "123 Main Street, City, Country",
    hours: "Mon-Fri: 9am-10pm, Sat-Sun: 10am-11pm",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec interdum leo.",
    photos: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg",
      "https://example.com/photo3.jpg"
    ]
  };

  return (
    <Animatable.View animation="fadeIn" duration={1000} style={[tw`flex-1 bg-gray-100`]}>
      <ScrollView>
        {/* Header */}
        <View style={[tw`p-4 bg-white`]}>
          <Text style={[tw`text-3xl font-bold text-gray-800 mb-2`]}>{business.name}</Text>
          <Text style={[tw`text-lg text-gray-700 mb-2`]}>Category: {business.category}</Text>
          <View style={[tw`flex-row items-center`]}>
            <Text style={[tw`text-lg text-gray-700 mr-2`]}>Rating: {business.rating}</Text>
          </View>
        </View>

        {/* Contact Details */}
        <View style={[tw`p-4 bg-white mt-4`]}>
          <Text style={[tw`text-xl font-semibold text-gray-800 mb-2`]}>Contact Details</Text>
          <TouchableOpacity style={[tw`flex-row items-center mb-2`]}>
            <FontAwesome name="envelope" size={20} color="#3182CE" style={[tw`mr-2`]}/>
            <Text style={[tw`text-lg text-gray-700`]}>Email: {business.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[tw`flex-row items-center mb-2`]}>
            <FontAwesome name="phone" size={20} color="#3182CE" style={[tw`mr-2`]}/>
            <Text style={[tw`text-lg text-gray-700`]}>Phone: {business.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[tw`flex-row items-center mb-2`]}>
            <FontAwesome name="map-marker" size={20} color="#3182CE" style={[tw`mr-2`]}/>
            <Text style={[tw`text-lg text-gray-700`]}>Address: {business.address}</Text>
          </TouchableOpacity>
          <Text style={[tw`text-lg text-gray-700`]}>Hours: {business.hours}</Text>
        </View>

        {/* Description */}
        <View style={[tw`p-4 bg-white mt-4`]}>
          <Text style={[tw`text-xl font-semibold text-gray-800 mb-2`]}>Description</Text>
          <Text style={[tw`text-lg text-gray-700`]}>{business.description}</Text>
        </View>

        {/* Photos */}
        <View style={[tw`p-4 bg-white mt-4`]}>
          <Text style={[tw`text-xl font-semibold text-gray-800 mb-2`]}>Photos</Text>
          <ScrollView horizontal>
            {business.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={[tw`w-40 h-40 rounded-md mr-4`]} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Animatable.View>
  );
};


export default Profile

