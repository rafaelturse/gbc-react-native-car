import React, { createContext, useState, useContext } from "react";

const OwnedVehicleContext = createContext();

export const OwnedVehicleContextProvider = ({ children }) => {
  const [ownedVehicles, setOwnedVehicles] = useState([]);

  return (
    <OwnedVehicleContext.Provider value={{ ownedVehicles, setOwnedVehicles }}>
      {children}
    </OwnedVehicleContext.Provider>
  );
};

export const useOwnedVehicleContext = () => useContext(OwnedVehicleContext);
