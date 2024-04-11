import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { dummyRestaurantsData } from '../Data/restaurantsData';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

const MarketCard = ({ restaurantData }) => {
  const ratingStyle = {
    color: restaurantData.rating < 4.5 ? 'black' : '#FF8C00',
  };

  return (
    <Link
      href={{
        pathname: `${restaurantData.id}`,
        params: { id: restaurantData.id },
      }}
      asChild
    >
      <Pressable className="mt-6 ">
        <View>
          <Image
            source={{ uri: restaurantData.profileImage }}
            className="w-full h-[180px] rounded-md"
            resizeMode="cover"
          />
          <View className="absolute bg-white rounded-sm bottom-2 right-2">
            <Text className="text-sm dont-semibold py-1 px-2">
              {restaurantData.delivery} min
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="text-base font-bold mt-2 text-[#2e303d]">
            {restaurantData.name}
          </Text>
          <View className="flex flex-row items-center">
            <FontAwesome name="star" size={17} color={ratingStyle.color} />
            <Text className="ml-1 font-bold text-base">
              {restaurantData.rating}
            </Text>
          </View>
        </View>
        <Text className="text-sm font-[#6e6d72]">{restaurantData.price} birr</Text>
      </Pressable>
    </Link>
  );
};



export default MarketCard;
