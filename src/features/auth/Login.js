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
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, FormRenderer } from "components/HookForms/FormProvider";

const schema = {
  submitLabel: "Giriş Yap",
  fields: [
    {
      name: "email",
      label: "E-posta adresiniz",
      placeholder: "E-posta adresiniz",
      component: "input",
      isRequired: true,
    },
    {
      name: "password",
      label: "Parolanız",
      placeholder: "Parolanız",
      type: "password",
      component: "input",
      isRequired: true,
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

  const { handleSubmit, reset } = methods;

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
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Card p={2} borderRadius="lg">
              <CardHeader>
                <Center>
                  <Heading as={"h3"} size="md">
                    Giriş Yap
                  </Heading>
                </Center>
              </CardHeader>
              <Divider></Divider>
              <CardBody>
                {schema.fields.map((field, index) => {
                  return (
                    <FormRenderer key={index} field={field}></FormRenderer>
                  );
                })}
              </CardBody>
              <CardFooter>
                <Button
                  mt={4}
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
          </FormProvider>
        </Box>
      </Center>
      ;
    </Flex>
  );
};

export default Login;
