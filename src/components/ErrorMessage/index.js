import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <Alert justifyContent="center" status="error">
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
};

export default ErrorMessage;
