import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ImageBackground , ScrollView, Dimensions,Button} from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker ';
import axios from 'axios';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPicker,setShowPicker]=useState(false)




  const handleSignUp = async() => {
    console.log('first Name:', firstName);
    console.log('middle Name:', middleName);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Date of Birth:', dateOfBirth);
    console.log('Zip Code:', zipCode);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    const fullName=firstName+ " "+middleName+ " "+lastName

await axios.post('http://localhost:8000/signup/create-user',{fullName,username,email,dateOfBirth,zipCode,password})
.then((res)=>{
   console.log(res.data)
})
.catch((err)=>{
  if(err){
    console.log(err.message)
  }
})

  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={tw`flex-1`}>
       <ImageBackground source={require('../Images/logo22.jpg')} style={tw`flex-1`} resizeMode="cover">
       <ScrollView contentContainerStyle={tw`justify-center items-center`} style={{ height: windowHeight }}>
      <View style={tw`flex-1 p-4 justify-center`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <AntDesign name="arrowleft" size={24} color="white" />
          <TouchableOpacity onPress={() => {}}>
            <Text style={tw`text-white`}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`items-center mb-8`}>
          <Image source={require('../Images/logo-removebg.png')} style={tw`w-32 h-32`} />
        </View>

        <Text style={tw`text-lg text-white font-bold mb-4 text-center`}>Registration</Text>

        <TextInput
          style={tw`w-full h-12 border bg-white border-gray-300 rounded w-70 ml-10 px-4 mb-4`}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
         <TextInput
          style={tw`w-full h-12 border bg-white border-gray-300 rounded w-70 ml-10 px-4 mb-4`}
          placeholder="Middle Name"
          value={middleName}
          onChangeText={(text) => setMiddleName(text)}
        />
         <TextInput
          style={tw`w-full h-12 border bg-white border-gray-300 rounded w-70 ml-10 px-4 mb-4`}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <TextInput
          style={tw`w-full h-12 border bg-white border-gray-300 rounded w-70 ml-10 px-4 mb-4`}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUserName(text)}
        />

        <TextInput
          style={tw`w-full h-12 border bg-white border-gray-300 rounded w-70 ml-10 px-4 mb-4`}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />


       <TextInput
          style={tw`w-full h-12 border bg-white border-gray-300 rounded w-70 ml-10 px-4 mb-4`}
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={(text) => set(text)}
        />
      <DateTimePicker
      mode='date'
      display='spinner'
      value={dateOfBirth}

      />


       

        <TextInput
          style={tw`w-full h-12 border bg-white border-gray-300 rounded w-70 ml-10 px-4 mb-4`}
          placeholder="Zip Code"
          value={zipCode}
          onChangeText={(text) => setZipCode(text)}
        />

        <TextInput
          style={tw`w-full h-12 border bg-white border-gray-300 rounded w-70 ml-10 px-4 mb-4`}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style={tw`w-full h-12 border bg-white border-gray-300 rounded w-70 ml-10 px-4 mb-4`}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <TouchableOpacity style={tw`bg-orange-500 rounded-full h-12 items-center justify-center mb-4 w-70 ml-10`} onPress={handleSignUp}>
          <Text style={tw`text-white font-bold`}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`bg-black rounded-full h-12 items-center justify-center mb-4 w-70 ml-10`} onPress={() => {}}>
          <Text style={tw`text-white font-bold`}>Register Business</Text>
        </TouchableOpacity>

        <View style={tw`border-b border-gray-300 my-8`} />

<TouchableOpacity style={tw`bg-white rounded-full h-12 items-center justify-center mb-4 w-60 ml-15`} onPress={() => {}}>
  <View style={tw`flex-row items-center `}>
    <FontAwesome5 name="google" size={20} color="black" style={tw`mr-2`} />
    <Text style={tw`text-black font-bold`}>Continue with Google</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity style={tw`bg-blue-500 rounded-full h-12 items-center justify-center mb-4 w-60 ml-15`} onPress={() => {}}>
  <View style={tw`flex-row items-center`}>
    <FontAwesome5 name="facebook" size={20} color="white" style={tw`mr-2`} />
    <Text style={tw`text-white font-bold`}>Continue with Facebook</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity style={tw`bg-black rounded-full h-12 items-center justify-center mb-4 w-60 ml-15`} onPress={() => {}}>
  <View style={tw`flex-row items-center justify-center`}>
    <FontAwesome5 name="apple" size={20} color="white" style={tw`mr-2`} />
    <Text style={tw`text-white font-bold`}>Continue with Apple</Text>
  </View>
</TouchableOpacity>

        <View style={tw`flex-row justify-center mt-8`}>
          <Text style={tw`text-sm text-white`}>Already registered? </Text>
          <Text style={tw`text-sm fontbold text-orange-500`}>Login</Text>
        </View>

      </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Registration;