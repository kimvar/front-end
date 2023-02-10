import FormInput from "components/HookForms/FormInput";
import FormSelect from "components/HookForms/FormSelect";
import { Box } from "@chakra-ui/react";

const FormRenderer = ({ field }) => {
  if (field.component === "input") {
    return (
      <Box key={field.name} mt={4}>
        <FormInput {...field}></FormInput>
      </Box>
    );
  }

  if (field.component === "select") {
    return (
      <Box key={field.name} mt={4}>
        <FormSelect {...field}></FormSelect>
      </Box>
    );
  }
};

export { FormRenderer };
