import React, { createContext, useState, useContext } from "react";

// Create the context
const BusinessTabContext = createContext();

// Create the provider component
export const BusinessTabProvider = ({ children }) => {
  const [businessTab, setBusinessTab] = useState(false);

  return (
    <BusinessTabContext.Provider value={{ businessTab, setBusinessTab }}>
      {children}
    </BusinessTabContext.Provider>
  );
};

// Custom hook to consume the context
export const useBusinessTab = () => {
  return useContext(BusinessTabContext);
};
