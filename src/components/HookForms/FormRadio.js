/**
 {
    component: "radio",
    name: "multiple",
    label: "Which Planet?",
    options: [
        { title: "World", value: "world" },
        { title: "Mars", value: "mars" },
    ],
 },
*/

import { useFormContext, Controller } from "react-hook-form";
import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

export default function FormCheckbox({ name, label = null, options = [] }) {
  const { control } = useFormContext();
  if (!name || !label) {
    throw new Error(
      "name, label are required in form checkbox type. [Can's Tiny Data Driven Form Builder]"
    );
  }

  if (!options.length === 0) {
    throw new Error(
      "options are required in form checkbox type. [Can's Tiny Data Driven Form Builder]"
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
          <RadioGroup defaultValue={field.value}>
            {options.map((option) => {
              return (
                <Radio
                  key={option.value}
                  name={name}
                  onChange={() => field.onChange(option.value)}
                  value={option.value}
                >
                  {option.title}
                </Radio>
              );
            })}
          </RadioGroup>
          <FormErrorMessage>
            {error && <Text fontSize={"sx"}>{error.message}</Text>}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
