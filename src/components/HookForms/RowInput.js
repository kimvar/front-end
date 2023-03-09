/**
 ** Form Row Element
{
  component: "row",
  name: 'row',
  fields: [
    {
      component: "input",
      name: "name",
      label: "Görevli Ad",
      placeholder: "Görevli Ad Soyad",
    },
    {
      component: "input",
      name: "lastname",
      label: "Görevli Soyad",
      placeholder: "Görevli Ad Soyad",
    },
  ],
},
 */
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
