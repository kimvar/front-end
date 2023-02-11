import { useState } from "react";
import { Button, Box, Flex } from "@chakra-ui/react";
import { user } from "utils";

function AddData() {
  const [timeStamp, setTimeStamp] = useState(Date.now());

  const iframeSrc = `https://form.jotform.com/230393262424956?userID=${user.credantials.name}-${user.credantials.lastname}-${user.credantials.tckn}`;

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
            className="iframe"
          ></iframe>
        </Flex>
      </Box>
    </Box>
  );
}

export default AddData;
