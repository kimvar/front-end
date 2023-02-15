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

const elements = {
  input: FormInput,
  select: FormSelect,
  row: RowInput,
  section: SectionInput,
  checkbox: FormCheckbox,
  radio: FormRadio,
};

const InputRenderer = ({ field: { component, as, ...rest } }) => {
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
      <Component {...rest} />
    </Box>
  );
};

export { InputRenderer };
