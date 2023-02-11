import { Flex } from "@chakra-ui/react";
import { InputRenderer } from "./InputRenderer";

const Row = ({ fields }) => {
  return (
    <Flex flexDirection={"row"} gap="10px">
      {fields.map((field) => {
        return <InputRenderer key={field.name} field={field} />;
      })}
    </Flex>
  );
};

export default Row;
