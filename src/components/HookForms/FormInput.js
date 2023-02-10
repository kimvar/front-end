import { useFormContext, Controller } from "react-hook-form";
import {
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function FormInput({ name, label, type = "text" }) {
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
              <Text fontSize="xs">{label}</Text>
            </FormLabel>
            <Input id={name} {...field} type={type} />
            <FormErrorMessage>
              {error && <Text fontSize={"sx"}>{error.message}</Text>}
            </FormErrorMessage>
          </FormControl>
        </>
      )}
    />
  );
}
