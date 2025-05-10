import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import tw from "twrnc";

const AboutBersoScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-white p-4 `}>
      <View style={tw`mb-6`}>
        <Text
          style={[tw`text-3xl font-bold mb-4 text-orange-500`, { fontFamily: "berlin-sans" }]}
        >
          About Berso
        </Text>
        <Text style={tw`text-base text-gray-700`}>
          Welcome to Berso, your go-to local business directory mobile app
          dedicated to bridging the gap between local businesses and consumers
          in Ethiopia.
        </Text>
      </View>

      <View style={tw`mb-6`}>
       <Text
        style={[tw`text-2xl font-bold mb-4 `, { fontFamily: "berlin-sans" }]}
      >Our Mission</Text>
        <Text style={tw`text-base text-gray-700`}>
          Berso aims to provide a reliable, user-friendly platform that connects
          users with local businesses, empowering informed decision-making
          through user-generated content, reviews, and ratings. We strive to
          enhance visibility for local businesses and support their growth by
          fostering trust and credibility.
        </Text>
      </View>

      <View style={tw`mb-6`}>
       <Text
        style={[tw`text-2xl font-bold mb-4 `, { fontFamily: "berlin-sans" }]}
      >The Challenge</Text>
        <Text style={tw`text-base text-gray-700`}>
          In Ethiopia, many local businesses struggle with limited visibility
          due to ineffective marketing strategies and scarce promotional
          resources. Establishing trust and credibility can be especially
          challenging for new or small businesses. Additionally, tourists and
          visitors face difficulties in finding local businesses and reliable
          information about them.
        </Text>
      </View>

      <View style={tw`mb-6`}>
       <Text
        style={[tw`text-2xl font-bold mb-4 `, { fontFamily: "berlin-sans" }]}
      >Our Solution</Text>
        <Text style={tw`text-base text-gray-700`}>
          Berso is designed to tackle these challenges head-on. Our platform
          offers:
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Comprehensive Business Listings: Discover businesses based on
          location, category, and user ratings.
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • User-Generated Reviews: Read and contribute reviews to help build a
          community-driven ecosystem.
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Business Verification: Ensure the accuracy and authenticity of
          business information.
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Personalized Recommendations: Advanced search algorithms tailor
          suggestions to your preferences.
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Community Engagement: Engage in discussions and share your
          experiences with others.
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Data Security: Robust measures to protect your privacy and
          information.
        </Text>
      </View>

      <View style={tw`mb-6`}>
       <Text
        style={[tw`text-2xl font-bold mb-4 `, { fontFamily: "berlin-sans" }]}
      >Why Berso?</Text>
        <Text style={tw`text-base text-gray-700`}>
          • Support Local: We prioritize local businesses, promoting authentic
          experiences.
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Enhanced Visibility: Effective marketing strategies to boost brand
          awareness and trust.
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • User-Friendly Interface: Easy navigation and real-time updates.
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Community Focus: Foster a vibrant community through engagement and
          interaction.
        </Text>
      </View>

      <View style={tw`mb-6`}>
       <Text
        style={[tw`text-2xl font-bold mb-4 `, { fontFamily: "berlin-sans" }]}
      >Our Vision</Text>
        <Text style={tw`text-base text-gray-700`}>
          We envision Berso as more than just an app. It's a platform that
          supports the local economy by connecting businesses with potential
          customers, both domestic and international. By leveraging technology,
          we aim to create a dynamic and inclusive space that benefits everyone
          involved.
        </Text>
      </View>

      <View style={tw`mb-6`}>
       <Text
        style={[tw`text-2xl font-bold mb-4 `, { fontFamily: "berlin-sans" }]}
      >Meet Our Team</Text>
        <Text style={tw`text-base text-gray-700`}>
          • Abigya Yohannes 
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Hiwot Berhanu 
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Jalal Addisu
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Kalkidan Tesfaye 
        </Text>
      </View>

  

      <View style={tw`mb-6`}>
       <Text
        style={[tw`text-2xl font-bold mb-4 `, { fontFamily: "berlin-sans" }]}
      >Contact Us</Text>
        <Text style={tw`text-base text-gray-700`}>
          Email: contact@berso.com
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          Phone: +251 123 456 789
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          Address: 123 Business St, Addis Ababa, Ethiopia
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          Website: www.berso.com
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          Follow us on social media:
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Facebook: facebook.com/berso
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Twitter: twitter.com/berso
        </Text>
        <Text style={tw`text-base text-gray-700 mt-2`}>
          • Instagram: instagram.com/berso
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutBersoScreen;
