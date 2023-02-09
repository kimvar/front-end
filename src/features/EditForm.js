import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

function EditForm() {
  const { register, handleSubmit } = useForm();

  const [ifrmSrc, setIfrmSrc] = useState("");
  const [isIfrmVisible, setIfrmVisible] = useState(false);

  const onSubmit = ({ code }) => {
    setIfrmVisible(true);
    setIfrmSrc(`https://jotform.com/edit/${code}`);
  };

  return (
    <Box flex alignItems={"center"}>
      <Box flex alignItems="center">
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection="column" gap={15} maxWidth={500}>
              <label htmlFor="code">Kayıt No:</label>
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
