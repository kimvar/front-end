import { useFormContext, Controller } from "react-hook-form";
import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

export default function FormSelect({
  name,
  disabled = false,
  title,
  ...other
}) {
  const { control } = useFormContext();

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
            <Select
              title="test"
              id={name}
              disabled={disabled}
              {...field}
              {...other}
            >
              {other.options.map((option, index) => {
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
