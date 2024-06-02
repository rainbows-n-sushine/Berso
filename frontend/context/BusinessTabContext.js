import React, { createContext, useState, useContext } from "react";

// Create the context
const BusinessTabContext = createContext();

// Create the provider component
 const BusinessTabProvider = ({ children }) => {
  const [businessTab, setBusinessTab] = useState(false);

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