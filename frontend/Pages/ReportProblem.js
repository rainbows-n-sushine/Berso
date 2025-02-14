import React, { useState,useContext } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import tw from "twrnc";
import api from '../util/Util'
import { AuthContext } from "../context/AuthContext";
<<<<<<< HEAD

const ReportProblemScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
=======
import { SelectList } from "react-native-dropdown-select-list";
const ReportProblemScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(null);
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
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

<<<<<<< HEAD
    await api.post('report/create',{name,email,description, userId})
=======
    await api.post('report/create',{name,email,description, userId,type})
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
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
<<<<<<< HEAD

  return (
    <View style={tw`flex-1 p-4 `}>
      <Text style={[tw`text-2xl font-bold mb-4 `, { fontFamily: "berlin-sans" }]}>Report a Problem</Text>

=======
   

   const handleSelectItem = (item) => {
     setType(item);
     // handle the selected item as needed
   };

   const reportType = [
     { key: "1", value: "Technical Issue" },
     { key: "2", value: "Inappropriate Action" },
     { key: "3", value: "Feature Request" },
     { key: "4", value: "Business Issue" },
     // add more  types as needed
   ];

  return (
    <View style={tw`flex-1 p-4 `}>
      <Text
        style={[
          tw`text-3xl font-bold mb-4 text-orange-500 `,
          { fontFamily: "berlin-sans" },
        ]}
      >
        Report a Problem
      </Text>
      <View style={tw`flex-row items-center mb-4`}>
        <SelectList
          setSelected={handleSelectItem}
          data={reportType}
          save="value"
          placeholder="Select the type of report..."
          search={true}
          inputStyles={tw`text-base text-black`}
          dropdownTextStyles={tw`text-base text-black`}
          boxStyles={tw`w-80 bg-white rounded-2xl`}
        />
      </View>
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
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
