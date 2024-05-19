import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack.js';
import { AuthContext } from '../../context/AuthContext.js';
import ProfileNavigator from './ProfileNavigator.js';
import HomeNavigator from './HomeNavigator.js'
import AppStack from './AppStack'



const AppNav = () => {

  const {isLoading, userToken, businessOwnerToken}=useContext(AuthContext)
//   const [loggedIn,setLoggedIn]=useState(userToken)

//   useEffect(()=>{

// const item=userToken
// setLoggedIn(item)

//   },[]);

useEffect(()=>{

  console.log("this is the userToken "+userToken)
  console.log("this is the businessOwnerToken "+businessOwnerToken)
},[])

  if(isLoading){
    return(
    <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
      
    )
    
  }

  return(
    <NavigationContainer>
       <AppStack/>
     
      {/* {userToken !== null?  <AppStack/> : <AuthStack/>} */}
    
  </NavigationContainer>
  )
  
}

export default AppNav