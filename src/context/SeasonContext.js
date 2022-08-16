import { createContext, useState } from 'react';

const SeasonContext = createContext();

export const FilterProvider = ({ children }) => {
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(thisYear);

  return (
    <SeasonContext.Provider
      value={{
        year,
        setYear,
      }}
    >
      {children}
    </SeasonContext.Provider>
  );
};

export default SeasonContext;
