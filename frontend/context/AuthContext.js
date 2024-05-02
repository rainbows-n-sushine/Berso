import React,{createContext,useState, useEffect} from 'react';
import {View,ScrollView, RefreshControl} from "react-native" 
import AsyncStorge from '@react-native-async-storage/async-storage'
import api from '../util/Util';




export const AuthContext=createContext();

const AuthProvider=({children})=>{

 
const [isLoading, setIsLoading]=useState(false);
const [userToken,setUserToken]=useState(null)
const [refreshing, setRefreshing] = useState(false);



useEffect(()=>{
    isLoggedIn();
},[]);

// const handleLogin=()=>{
// navigation.navigate('Login')

// }


///this could potentially be a bug in the code



const login=async(credential,password)=>{
await api.post('user/signin',{credential,password})
.then((res)=>{
    
    setIsLoading(true)
    console.log(res.data)
    const token=res.data.token
    AsyncStorge.setItem('userToken',token)
    setUserToken(token);

    // const email= await AsyncStorage.setItem('userEmail',JSON.stringify(userInfo))
    setIsLoading(false);
    console.log("this is the token in login: "+token )
    
    

}).catch((error)=>{

    if(error){
        console.log('error in login authContext: ',error.message)
    }
})
}


const logout=()=>{
    setRefreshing(true)
    setIsLoading(true);
    setUserToken(null)
    AsyncStorge.removeItem('userToken')
    setIsLoading(false);
    setRefreshing(false)

    console.log("this is the value of userToken after refresh: "+userToken)

}

const isLoggedIn=async function(){
    try {
    setIsLoading(true)
    // const email=await AsyncStorge.getItem('email')
    // const password=await AsyncStorge.getItem('email')
    
    const token=await AsyncStorge.getItem('userToken')
    console.log(userToken)
    setUserToken(token)
    setIsLoading(false)
        
    } catch (error) {
        if(error){
            console.log('the error:',error.message)
        }
        
    }
    


}

return(

//     <View>

// <ScrollView
//    refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={logout}
//           />}>



    <AuthContext.Provider value={{login,logout,isLoading,userToken}}>
        {children}
    </AuthContext.Provider>
    
    // </ScrollView>
    // </View>
)
}

export default AuthProvider; 