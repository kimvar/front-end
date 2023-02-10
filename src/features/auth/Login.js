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

const schema = {
  submitLabel: "Giriş Yap",
  id: "login-form",
  fields: [
    {
      name: "email",
      label: "E-posta adresiniz",
      placeholder: "E-posta adresiniz",
      component: "input",
    },
    {
      name: "password",
      label: "Parolanız",
      placeholder: "Parolanız",
      type: "password",
      component: "input",
    },
    {
      name: "test",
      label: "Test",
      placeholder: "Test",
      component: "select",
      options: [
        {
          title: "Option 1",
          value: 1,
        },
        {
          title: "Option 2",
          value: 2,
        },
        {
          title: "Option 3",
          value: 3,
        },
      ],
    },
  ],
};

const Login = () => {
  const formScheme = yup.object().shape({
    email: yup
      .string()
      .required("E-posta alanı zorunludur.")
      .email("Lütfen geçerli bir email adresi giriniz."),
    password: yup
      .string()
      .min(6, "Parola en az 6 karakter oluşmalıdır.")
      .required("Parola alanı zorunludur."),
  });

  const methods = useForm({
    resolver: yupResolver(formScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { reset } = methods;

  const onSubmit = (data) => {
    console.log(data);
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
        <Box minW={{ base: "90%", md: "408px" }}>
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
                {schema.submitLabel}
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
      ;
    </Flex>
  );
};

export default Login;
