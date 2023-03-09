/**
 * Form Section Element
{
  component: "section",
  id: "first",
  label: "Hello",
  fields: [
    {
      component: "input",
      name: "name",
      label: "Görevli Ad",
      placeholder: "Görevli Ad Soyad",
    },
  ],
},
 */
import SectionWrapper from "./SectionWrapper";
import SpecialSectionProvider from "./SpecialSectionProvider";

import { InputRenderer } from "./InputRenderer";
import { SpecialFormContext } from "./SpecialFormProvider";
import { Button, Flex, Box } from "@chakra-ui/react";
import { useContext } from "react";

const SectionInput = ({ id, label, fields }) => {
  const { accordion, setAccordion } = useContext(SpecialFormContext);

  const expand = () => {
    setAccordion(id);
  };
  const collapse = () => {
    setAccordion(null);
  };

  const toggle = () => {
    if (accordion === id) {
      collapse();
    } else {
      expand();
    }
  };

  return (
    <SpecialSectionProvider>
      <SectionWrapper>
        {({ hasError }) => (
          <Box>
            <Button
              onClick={toggle}
              width="100%"
              border={"2px"}
              borderColor={hasError ? "red" : "transparent"}
              backgroundColor={hasError && "red.100"}
            >
              {label}
            </Button>
            <Flex flexDirection={"column"} gap="10px" hidden={accordion !== id}>
              {fields.map((field) => {
                return (
                  <InputRenderer key={field.name || field.id} field={field} />
                );
              })}
            </Flex>
          </Box>
        )}
      </SectionWrapper>
    </SpecialSectionProvider>
  );
};

export default SectionInput;
