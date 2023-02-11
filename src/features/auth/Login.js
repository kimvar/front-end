import React from "react";
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
  Link,
  Image,
} from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormRenderer } from "components/HookForms/FormRenderer";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-posta alanı zorunludur.")
    .email("Lütfen geçerli bir email adresi giriniz."),
  password: yup
    .string()
    .min(6, "Parola en az 6 karakter oluşmalıdır.")
    .required("Parola alanı zorunludur."),
});

const schema = {
  id: "login-form",
  fields: [
    {
      component: "input",
      name: "email",
      label: "E-posta adresiniz",
      placeholder: "E-posta adresiniz",
    },
    {
      component: "input",
      name: "password",
      label: "Parolanız",
      placeholder: "Parolanız",
      type: "password",
    },
  ],
};

const Login = () => {
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      email2: "",
      email3: "",
    },
  });

  const { reset } = methods;

  const onSubmit = (data) => {
    reset();
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
            <FormProvider {...methods} onSubmit={onSubmit}>
              <CardBody>
                <FormRenderer schema={schema}></FormRenderer>
              </CardBody>
            </FormProvider>

            <CardFooter>
              <Button
                mt={4}
                form="login-form"
                colorScheme="teal"
                isLoading={methods.isSubmitting}
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
                    src="/logo.png"
                    alt="Afet İletişim Bilgi Sistemi"
                  />
                </Center>
              </Box>
            </CardFooter>
            <CardFooter m={0} p={0}>
              <Box
                justifyContent={"center"}
                alignContent="center"
                width={"100%"}
                style={{ textAlign: "center" }}
              >
                <Link color="teal.500" href="#" fontSize={"xs"}>
                  Şifremi Unuttum
                </Link>
              </Box>
            </CardFooter>
          </Card>
        </Box>
      </Center>
    </Flex>
  );
};

export default Login;
