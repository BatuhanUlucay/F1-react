import { createContext, useState } from 'react';

const CurrentDriversContext = createContext();

export const CurrentDriversProvider = ({ children }) => {
  const [driverIds, setDriverIds] = useState([]);

  return (
    <CurrentDriversContext.Provider
      value={{
        driverIds,
        setDriverIds,
      }}
    >
      {children}
    </CurrentDriversContext.Provider>
  );
};

export default CurrentDriversContext;
