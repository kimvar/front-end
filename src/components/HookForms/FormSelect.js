/**
 ** Form Select Element
  {
    component: "select",
    name: "genre",
    defaultOption: {
      value: "0",
      title: "Please Select",
    },
    options: [
      {
        value: "female",
        title: "Female",
      },
      {
        value: "male",
        title: "Male",
      },
    ],
  },
 */
import { useFormContext, Controller } from "react-hook-form";
import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function FormSelect({
  name,
  value,
  disabled = false,
  options = [],
  defaultOption = null,
  ...other
}) {
  if (!name || !value) {
    throw new Error(
      "name, and value are required in form select type. [Can's Tiny Data Driven Form Builder]"
    );
  }

  const { control } = useFormContext();
  if (!name || !value) {
    throw new Error(
      "name and value are required in form select type. [Can's Tiny Data Driven Form Builder]"
    );
  }

  if (options.length === 0) {
    throw new Error(
      "options are required in select type. [Can's Tiny Data Driven Form Builder]"
    );
  }
  return (
    <Controller
      name={name}
      defaultValue={""}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControl isInvalid={error}>
            <FormLabel htmlFor={name}>
              <Text fontSize="xs">{other.label}</Text>
            </FormLabel>
            <Select id={name} disabled={disabled} {...field}>
              {defaultOption && (
                <option value={defaultOption.value}>
                  {defaultOption.title}
                </option>
              )}
              {options.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.title}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>
              {error && <Text fontSize={"sx"}>{error.message}</Text>}
            </FormErrorMessage>
          </FormControl>
        </>
      )}
    />
  );
}

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default FormSelect;
