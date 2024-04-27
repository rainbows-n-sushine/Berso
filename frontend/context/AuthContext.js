import React,{createContext,useState, useEffect} from 'react'; 
import AsyncStorge from '@react-native-async-storage/async-storage'
import { useNavigation } from 'expo-router';
import api from '../util/Util';


export const AuthContext=createContext();

const AuthProvider=({children})=>{

    // const navigation=useNavigation()
const [isLoading, setIsLoading]=useState(false);
const [userToken,setUserToken]=useState(null)


useEffect(()=>{
    isLoggedIn();
},[]);

// const handleLogin=()=>{
// navigation.navigate('Login')

// }

const login=(username,password)=>{
api.post('jwt-auth/v1/token',{username,password})
.then()


    setIsLoading(true)
    setUserToken('bddkavgada');
    AsyncStorge.setItem('userToken','bddkavgada')
    setIsLoading(false);
    

}
const logout=()=>{

    setIsLoading(true);
    setUserToken(null)
    AsyncStorge.removeItem('userToken')
    setIsLoading(false);

}

const isLoggedIn=async function(){
    try {
    isLoading(true)
    let userToken=await AsyncStorge.getItem('userToken')
    console.log(userToken)
    setUserToken(userToken)
    setIsLoading(false)
        
    } catch (error) {
        if(error){
            console.log('the error:',error.message)
        }
        
    }
    


}

return(

    <AuthContext.Provider value={{login,logout,isLoading,userToken}}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthProvider; 