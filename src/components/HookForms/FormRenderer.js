import { Box } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { InputRenderer } from "./InputRenderer";

const FormRenderer = ({ schema }) => {
  const { handleSubmit } = useFormContext();
  return (
    <form onSubmit={handleSubmit(schema.onSubmit)} id={schema.id}>
      <Box mt={4}>
        {schema.fields.map((field) => {
          return <InputRenderer key={field.name} field={field}></InputRenderer>;
        })}
      </Box>
    </form>
  );
};

export { FormRenderer };
