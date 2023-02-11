import FormInput from "components/HookForms/FormInput";

import FormSelect from "components/HookForms/FormSelect";

import { Box } from "@chakra-ui/react";
import RowInput from "./RowInput";
import SectionInput from "./SectionInput";

const elements = {
  input: FormInput,
  select: FormSelect,
  row: RowInput,
  section: SectionInput,
};
const InputRenderer = ({ field }) => {
  const Component = elements[field.component];
  if (!Component) {
    throw Error("Component type is invalid! " + field.component);
  }
  return (
    <Box mt={4}>
      <Component {...field} />
    </Box>
  );
};

export { InputRenderer };
