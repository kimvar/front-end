import React from "react";
import {
  Button,
  Box,
  Flex,
  Input,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
    reset,
  } = useForm({
    resolver: yupResolver(formScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">
                    <Text fontSize="xs">E-posta Adresiniz</Text>
                  </FormLabel>
                  <Input
                    id="email"
                    placeholder="E-posta adresi"
                    {...register("email")}
                  />
                  <FormErrorMessage>
                    {errors.email && (
                      <Text fontSize={"sx"}>{errors.email.message}</Text>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </CardBody>
              <CardBody>
                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password">
                    <Text fontSize="xs">Şifreniz</Text>
                  </FormLabel>
                  <Input
                    type={"password"}
                    id="password"
                    placeholder="Şifreniz"
                    {...register("password")}
                  />
                  <FormErrorMessage>
                    {errors.password && (
                      <Text fontSize={"sx"}>{errors.password.message}</Text>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </CardBody>
              <CardFooter>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
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
          </form>
        </Box>
      </Center>
    </Flex>
  );
};

export default Login;
