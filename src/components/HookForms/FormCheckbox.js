/**
 ** Form Checkbox Element
{
  component: "checkbox",
  name: "user",
  label: "Görevli Ad",
  title: "Görevli",
},
*/

import { useFormContext, Controller } from "react-hook-form";
import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function FormCheckbox({ name, label = null, title = null }) {
  const { control } = useFormContext();
  if (!name) {
    throw new Error(
      "name is required in form checkbox type.[Can's Tiny Data Driven Form Builder]"
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={error}>
          <FormLabel htmlFor={name}>
            <Text fontSize="xs">{label}</Text>
          </FormLabel>
          <Checkbox size="md" colorScheme="green" {...field}>
            {title}
          </Checkbox>
          <FormErrorMessage>
            {error && <Text fontSize={"sx"}>{error.message}</Text>}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

FormCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.array.isRequired,
};

export default FormCheckbox;
