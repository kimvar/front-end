/**
 ** Custom Form Element
  {
    component: "custom",
    as: CustomComponent,
  },
 */

import FormInput from "components/HookForms/FormInput";

import FormSelect from "components/HookForms/FormSelect";

import { Box } from "@chakra-ui/react";
import RowInput from "./RowInput";
import SectionInput from "./SectionInput";
import FormCheckbox from "./FormCheckbox";
import FormRadio from "./FormRadio";
import FormDatepicker from "./FormDatepicker";
import FormPhoneInput from "./FormPhone";
import { useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";
import { SpecialSectionContext } from "./SpecialSectionProvider";

const elements = {
  input: FormInput,
  select: FormSelect,
  row: RowInput,
  section: SectionInput,
  checkbox: FormCheckbox,
  radio: FormRadio,
  datepicker: FormDatepicker,
  phone: FormPhoneInput,
};

const InputRenderer = ({ field: { component, as, name, ...rest } }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const { setHasError } = useContext(SpecialSectionContext);
  let hasError = false;
  if (name) {
    hasError = Boolean(errors[name]);
  }

  useEffect(() => {
    setHasError(hasError);
  }, [hasError, setHasError]);

  let Component;
  if (component === "custom") {
    Component = as;
  } else {
    Component = elements[component];
  }

  if (!Component) {
    throw Error("Component type is invalid! " + component);
  }
  return (
    <Box mt={4}>
      <Component name={name} {...rest} />
    </Box>
  );
};

export { InputRenderer };
