import { useContext } from "react";

import { SpecialSectionContext } from "./SpecialSectionProvider";

const SectionWrapper = ({ children }) => {
  const { hasError } = useContext(SpecialSectionContext);

  return children({ hasError });
};

export default SectionWrapper;
