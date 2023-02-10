import { useFormContext, Controller } from "react-hook-form";
import {
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function FormInput({ name, disabled = false, title, ...other }) {
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
            <Input
              title="test"
              id={name}
              disabled={disabled}
              {...field}
              {...other}
            />
            <FormErrorMessage>
              {error && <Text fontSize={"sx"}>{error.message}</Text>}
            </FormErrorMessage>
          </FormControl>
        </>
      )}
    />
  );
}
