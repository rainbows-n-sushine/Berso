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
api.post('user/signin',{username,password})
.then((res)=>{
    
    setIsLoading(true)
    console.log(res.data)
    const token=res.data.token
    AsyncStorgeStorage.setItem('userToken',token)
    setUserToken(token);
    setIsLoading(false);

}).catch((error)=>{

    if(error){
        console.log('error in login authContext: ',error.message)
    }
})


    
    
    
   
    

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