import FormInput from "components/HookForms/FormInput";
import { Box } from "@chakra-ui/react";

const FormRenderer = ({ field }) => {
  if (field.component === "input") {
    return (
      <Box key={field.name} mt={4}>
        <FormInput {...field}></FormInput>
      </Box>
    );
  }
};

export { FormRenderer };
