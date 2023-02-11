import React, { useState } from "react";

export const SpecialFormContext = React.createContext({
  accordion: null,
});

const SpecialFormProvider = ({ children }) => {
  const [accordion, setAccordion] = useState(null);
  return (
    <SpecialFormContext.Provider
      value={{
        accordion,
        setAccordion,
      }}
    >
      {children}
    </SpecialFormContext.Provider>
  );
};

export default SpecialFormProvider;
