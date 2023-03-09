import React, { useState } from "react";

export const SpecialSectionContext = React.createContext({
  setHasError: () => null,
  hasError: false,
});

const SpecialFormProvider = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <SpecialSectionContext.Provider
      value={{
        setHasError,
        hasError,
      }}
    >
      {children}
    </SpecialSectionContext.Provider>
  );
};

export default SpecialFormProvider;
