import { useState } from "react";
import { Button, Box, Flex } from "@chakra-ui/react";
import { user } from "@utils";

function AddData() {
  const [timeStamp, setTimeStamp] = useState(Date.now());

  const iframeSrc = `https://europe-west3-canvas-syntax-367803.cloudfunctions.net/proxy/add-guest?id=new&userID=${user.credantials.name}-${user.credantials.lastname}-${user.credantials.tckn}&timestamp=${timeStamp}`;

  const handleRefresh = () => {
    setTimeStamp(Date.now());
  };

  return (
    <Box flex alignItems={"center"}>
      <Box flex alignItems="center">
        <Flex gap={15} flexDirection="column">
          <Flex justifyContent={"space-between"} gap="20px">
            <Button type="button" colorScheme="green" onClick={handleRefresh}>
              Yeni Kayıt
            </Button>
          </Flex>
          <iframe
            src={iframeSrc + "&timestamp=" + timeStamp}
            title="Form"
            className="iframe"></iframe>
        </Flex>
      </Box>
    </Box>
  );
}

export default AddData;
