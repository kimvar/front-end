import { Box } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { InputRenderer } from "./InputRenderer";
import SpecialFormProvider from "./SpecialFormProvider";

const FormRenderer = ({ schema }) => {
  const { handleSubmit } = useFormContext();
  return (
    <SpecialFormProvider>
      <form onSubmit={handleSubmit(schema.onSubmit)} id={schema.id}>
        <Box mt={4}>
          {schema.fields.map((field) => {
            return (
              <InputRenderer
                key={field.name || field.id}
                field={field}
              ></InputRenderer>
            );
          })}
        </Box>
      </form>
    </SpecialFormProvider>
  );
};

export { FormRenderer };
