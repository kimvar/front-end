import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import axios from "axios";

function EditForm() {
  const { register, handleSubmit } = useForm();

  const [ifrmSrc, setIfrmSrc] = useState("");
  const [isIfrmVisible, setIfrmVisible] = useState(false);
  const [isError, setError] = useState(false);
  const onSubmit = async ({ code }) => {
    setError(false);
    try {
      const res = await axios.get(
        `https://api.jotform.com/form/230393262424956/submissions?apiKey=38c1f731467c6e32e36eca2c5c&filter={"q77":${code}}`
      );

      const { id } = res.data.content[0];
      setIfrmVisible(true);
      setIfrmSrc(`https://jotform.com/edit/${id}`);
    } catch {
      setIfrmVisible(true);
      setError(true);
    }
  };

  return (
    <Box flex alignItems={"center"}>
      <Box flex alignItems="center">
        {isError && (
          <Alert maxW={500} my={"20px"} justifyContent="center" status="error">
            <AlertIcon />
            <AlertTitle>Girdiğiniz bilgilerle eşleşen kimse yok.</AlertTitle>
          </Alert>
        )}
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
        )}
      </Box>
    </Box>
  );
}

export default EditForm;
