import React,{createContext,useState} from 'react'; 
export const AuthContext=createContext();

const AuthProvider=({children})=>{
const [isLoading, setIsLoading]=useState(true);
const [userToken,setUserToken]=useState(null)


const login=()=>{

    setIsLoading(false);
    setUserToken('bddkavgada');

}
const logout=()=>{

    setIsLoading(false);
    setUserToken(null)
}

return(

    <AuthContext.Provider value={{login,logout}}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthProvider; 