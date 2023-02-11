import { Button, Flex, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { InputRenderer } from "./InputRenderer";
import { SpecialFormContext } from "./SpecialFormProvider";

const SectionInput = ({ name, label, fields }) => {
  const { accordion, setAccordion } = useContext(SpecialFormContext);
  const expand = () => {
    setAccordion(name);
  };
  const collapse = () => {
    setAccordion(null);
  };

  if (accordion !== name) {
    return (
      <Button onClick={expand} width="100%">
        {label}
      </Button>
    );
  }
  return (
    <Box>
      <Button onClick={collapse} width="100%">
        {label}
      </Button>
      <Flex flexDirection={"row"} gap="10px">
        {fields.map((field) => {
          return <InputRenderer key={field.name} field={field} />;
        })}
      </Flex>
    </Box>
  );
};

export default SectionInput;
