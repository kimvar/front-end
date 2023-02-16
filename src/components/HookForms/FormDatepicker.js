/**
** Form Datepicker Element
{
    {
        component: "datepicker",
        name: "date",
        label: "Start Date",
    },
}
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
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactInputMask from "react-input-mask";

function FormDatepicker({ name, label }) {
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
          <ReactDatePicker
            id={name}
            customInput={
              <Input as={ReactInputMask} {...field} mask="99-99-9999" />
            }
            selected={field.value}
            dateFormat="dd-MM-yyyy"
            placeholderText="DD-MM-YYYY"
            onChange={field.onChange}
          />
          <FormErrorMessage>
            {error && <Text fontSize={"sx"}>{error.message}</Text>}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

FormDatepicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormDatepicker;
