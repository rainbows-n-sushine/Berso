
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const BusinessList = ({ route }) => {
  const { category } = route.params;
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetch(`business/${category}`)
      .then((response) => response.json())
      .then((data) => setBusinesses(data))
      .catch((error) => console.error("Error fetching businesses:", error));
  }, [category]);

  return (
    <View>
      <Text>List of {category}</Text>
      <View>
        {businesses.map((business) => (
          <View key={business._id} >
            <Text >{business.businessName}</Text>
            <Text >
              {business.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BusinessList;
