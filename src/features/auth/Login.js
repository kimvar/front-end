import React, { useState } from "react";
import {
  Flex,
  Button,
  Box,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormRenderer } from "components/HookForms/FormRenderer";
import { tcknQuery, user } from "utils";
import axios from "axios";
import ErrorMessage from "components/ErrorMessage";

const formSchema = yup.object().shape({
  name: yup.string().required("Bu alan zorunludur."),
  lastname: yup.string().required("Bu alan zorunludur."),
  tckn: yup
    .string()
    .required("Bu alan zorunludur.")
    .test(
      "isTcknValid",
      "Lütfen geçerli bir T.C. Kimlik No. giriniz.",
      tcknQuery
    ),
});

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      tckn: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const { tckn } = data;

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await axios.get(
        `https://api.jotform.com/form/230401567881052/submissions?apiKey=${process.env.REACT_APP_JF_API_KEY}&filter={"q4":${tckn}}`
      );

      if (res.data.content.length > 0) {
        user.handleLogin(data);
      } else {
        setErrorMessage(
          "Girdiğiniz bilgilerin sisteme erişim yetkisi bulunmamaktadır."
        );
      }
    } catch (err) {
      setErrorMessage("Beklenmedik bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const schema = {
    id: "login-form",
    onSubmit: handleSubmit(onSubmit),
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
      {
        component: "input",
        name: "tckn",
        label: "Görevli T.C. Kimlik No.",
        placeholder: "Görevli T.C. Kimlik No.",
      },
    ],
  };

  return (
    <Flex
      position={"relative"}
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems="center"
    >
      <Center>
        <Box width={"100%"} minW="400px" maxW={{ base: "100px", md: "400px" }}>
          <Card p={2} borderRadius="lg">
            <CardHeader>
              <Center>
                <Heading as={"h3"} size="md">
                  Giriş Yap
                </Heading>
              </Center>
            </CardHeader>
            <Divider></Divider>

            <ErrorMessage message={errorMessage} />
            <FormProvider {...methods}>
              <CardBody>
                <FormRenderer schema={schema}></FormRenderer>
              </CardBody>
            </FormProvider>

            <CardFooter>
              <Button
                mt={4}
                form="login-form"
                colorScheme="teal"
                isLoading={isLoading}
                type="submit"
                borderRadius={0}
                variant="solid"
                width="full"
              >
                Giriş Yap
              </Button>
            </CardFooter>
            <Divider></Divider>

            <CardFooter m={0} p={0}>
              <Box
                justifyContent={"center"}
                alignContent="center"
                width={"100%"}
                style={{ textAlign: "center" }}
              >
                <Center>
                  <Image
                    boxSize="130px"
                    objectFit="contain"
                    src="assets/images/logo.png"
                    alt="Afet İletişim Bilgi Sistemi"
                  />
                </Center>
              </Box>
            </CardFooter>
          </Card>
        </Box>
      </Center>
    </Flex>
  );
};

export default Login;
