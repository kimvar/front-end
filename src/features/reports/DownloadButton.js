import { Button } from "@chakra-ui/react";
import { user } from "@utils";
import { useState } from "react";
import { registerReportRequest } from "services";

const DownloadButton = ({ setErrorMessage }) => {
  const [isDownloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    setErrorMessage(null);
    try {
      const _token = await registerReportRequest();
      if (_token) {
        window.open(
          `${process.env.REACT_APP_API_URL}/downloadReport?type=excel&token=${_token}&identityNumber=${user.credantials.tckn}`
        );
      } else {
        setErrorMessage("Beklenmedik bir hata oluştu.");
      }
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
