/**
** Form Phone Element
{
    component: "phone",
    name: "phonenumber",
    label: "Phone Number",
},
*/

import { useFormContext, Controller } from "react-hook-form";
import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import ReactInputMask from "react-input-mask";

function FormPhoneInput({ name, label, ...rest }) {
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
          <Input
            id={name}
            as={ReactInputMask}
            mask="(999) 999 99 99"
            placeholder="(999) 999 99 99"
            {...rest}
            {...field}
          />
          <FormErrorMessage>
            {error && <Text fontSize={"sx"}>{error.message}</Text>}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

FormPhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormPhoneInput;
