import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack.js';
import { AuthContext } from '../../context/AuthContext.js';
import ProfileNavigator from './ProfileNavigator.js';
import HomeNavigator from './HomeNavigator.js'
import AppStack from './AppStack'
import { BusinessTabProvider } from '../../context/BusinessTabContext.js';



const AppNav = () => {

  const {isLoading, userToken}=useContext(AuthContext)
//   const [loggedIn,setLoggedIn]=useState(userToken)

//   useEffect(()=>{

// const item=userToken
// setLoggedIn(item)

//   },[]);

useEffect(()=>{

  console.log("this is the userToken "+userToken)
},[])

  if(isLoading){
    return(
    <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
      
    )
    
  }

  return (
    <BusinessTabProvider>
      <NavigationContainer>
        <AppStack />

        {/* {userToken !== null?  <AppStack/> : <AuthStack/>} */}
      </NavigationContainer>
    </BusinessTabProvider>
  );
  
}

export default AppNav