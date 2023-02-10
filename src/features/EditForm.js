import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import axios from "axios";

function EditForm() {
  const { register, handleSubmit } = useForm();

  const [ifrmSrc, setIfrmSrc] = useState("");
  const [isIfrmVisible, setIfrmVisible] = useState(false);

  const onSubmit = async ({ tckn }) => {
    const res = await axios.get(
      `https://api.jotform.com/form/230393262424956/submissions?apiKey=38c1f731467c6e32e36eca2c5c&filter={"q77":${tckn}`
    );

    const { id } = res.data.content[0];
    setIfrmVisible(true);
    setIfrmSrc(`https://jotform.com/edit/${id}`);
  };

  return (
    <Box flex alignItems={"center"}>
      <Box flex alignItems="center">
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection="column" gap={15} maxWidth={500}>
              <label htmlFor="code">Depremzede TC No:</label>
              <Input required {...register("code")} />
              <Button type="submit" colorScheme="blue">
                Düzenle
              </Button>
            </Flex>
          </form>
        </>
        {isIfrmVisible && (
          <div>
            <iframe src={ifrmSrc} title="Form" className="iframe"></iframe>
          </div>
        )}{" "}
      </Box>
    </Box>
  );
}

export default EditForm;
