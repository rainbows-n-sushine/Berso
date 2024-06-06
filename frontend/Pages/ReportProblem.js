import React, { useState,useContext } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import tw from "twrnc";
import api from '../util/Util'
import { AuthContext } from "../context/AuthContext";

const ReportProblemScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const {userId}=useContext(AuthContext)

  const handleSubmit = async() => {
    // Validate form inputs
    if (!name || !email || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Handle form submission logic here
    // For simplicity, we're just logging the form data
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Description:", description);

    await api.post('report/create',{name,email,description, userId})
    .then((res)=>{
      console.log(res.data.message)
      if(res.data.success===true){
        Alert.alert(res.data.message)
      }
    }).catch((error)=>{
      if (error){
         console.log("Error in filing a report ",report.message)
      }
     
    })

    // Reset form fields after submission
    setName("");
    setEmail("");
    setDescription("");

    // Show success message
    Alert.alert("Success", "Problem reported successfully");
  };

  return (
    <View style={tw`flex-1 p-4 `}>
      <Text style={[tw`text-2xl font-bold mb-4 `, { fontFamily: "berlin-sans" }]}>Report a Problem</Text>

      <TextInput
        style={tw`border p-2 mb-4 rounded-xl bg-white`}
        value={name}
        onChangeText={setName}
        placeholder="Your Name"
      />

      <TextInput
        style={tw`border p-2 mb-4 rounded-xl  bg-white`}
        value={email}
        onChangeText={setEmail}
        placeholder="Your Email"
        keyboardType="email-address"
      />

      <TextInput
        style={[tw`border p-2 mb-4 rounded-xl  bg-white `, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={tw`bg-orange-400 rounded-2xl h-12 items-center justify-center mb-4  mt-4`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white font-bold text-base`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportProblemScreen;
