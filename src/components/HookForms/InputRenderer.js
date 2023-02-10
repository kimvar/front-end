import FormInput from "components/HookForms/FormInput";

import FormSelect from "components/HookForms/FormSelect";

import { Box } from "@chakra-ui/react";
const elements = {
  input: FormInput,
  select: FormSelect,
};
const InputRenderer = ({ field }) => {
  const Component = elements[field.component];
  if (!Component) {
    throw Error("Component type is invalid!");
  }
  return (
    <Box mt={4}>
      <Component {...field} />
    </Box>
  );
};

export { InputRenderer };
