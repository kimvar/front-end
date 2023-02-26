import { useRef } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { user } from "@utils";
import { useState } from "react";
import { downloadReports } from "services";

const DownloadButton = ({ setErrorMessage }) => {
  const [isDownloading, setDownloading] = useState(false);

  const toast = useToast();
  const toastIdRef = useRef();

  const handleDownload = async () => {
    const { tckn } = user.credantials;

    setDownloading(true);
    setErrorMessage(null);

    try {
      const res = await downloadReports({ tckn });
      toastIdRef.current = toast({
        title: "Başarılı!",
        description: res.message,
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button
      type="button"
      colorScheme="green"
      onClick={handleDownload}
      isLoading={isDownloading}
      loadingText="Rapor İndiriliyor..."
    >
      Rapor İndir
    </Button>
  );
};

export default DownloadButton;
