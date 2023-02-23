import React from "react";
import { Spinner, Flex, Center, Box, Text } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Flex
      position={"relative"}
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems="center">
      <Center>
        <Box
          width={"100%"}
          flex
          justifyContent="center"
          py={15}
          px={10}
          border="2px"
          borderRadius={15}
          borderColor="blue.200">
          <Flex flexDirection="row" gap={10}>
            <Text fontSize="2xl">Yükleniyor...</Text>
            <Spinner textAlign="center" size="lg" />
          </Flex>
        </Box>
      </Center>
    </Flex>
  );
};

export default LoadingScreen;
