<<<<<<< HEAD
import React, { createContext, useState, useContext } from "react";
=======
import React, { createContext, useState,useEffect , useContext } from "react";
import { AuthContext } from "./AuthContext";
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

// Create the context
const BusinessTabContext = createContext();

// Create the provider component
 const BusinessTabProvider = ({ children }) => {
  const [businessTab, setBusinessTab] = useState(false);
<<<<<<< HEAD
=======
  
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

  return (
    <BusinessTabContext.Provider value={{ businessTab, setBusinessTab }}>
      {children}
    </BusinessTabContext.Provider>
  );
};

export default BusinessTabProvider;



//Custom hook to consume the context
export const useBusinessTab = () => {
  return useContext(BusinessTabContext);
};