/**
** Form Input Element
{
    component: "input",
    name: "name",
    label: "Görevli Ad",
    placeholder: "Görevli Ad Soyad",
}
*/

import { useFormContext, Controller } from "react-hook-form";
import {
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function FormInput({ name, label, type = "text" }) {
  if (!name || !label) {
    throw new Error(
      "name and label required on input type. [Can's Tiny Data Driven Form Builder]"
    );
  }
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={error}>
          <FormLabel htmlFor={name}>
            <Text fontSize="xs">{label}</Text>
          </FormLabel>
          <Input id={name} {...field} type={type} />
          <FormErrorMessage>
            {error && <Text fontSize={"sx"}>{error.message}</Text>}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default FormInput;
