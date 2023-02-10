import { FormProvider as Form } from "react-hook-form";
import { FormRenderer } from "./FormRenderer";
function FormProvider({ onSubmit, methods, children }) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
export { FormProvider, FormRenderer };
