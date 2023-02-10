import { useForm } from "react-hook-form";

import styles from "./loginForm.module.css";
import { useState } from "react";
import {
  Button,
  Box,
  Flex,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import axios from "axios";

function LoginForm() {
  const { register, reset, handleSubmit } = useForm();

  const [ifrmSrc, setIfrmSrc] = useState(null);
  const [isIfrmVisible, setIfrmVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeStamp, setTimeStamp] = useState(Date.now());
  const onSubmit = async (data) => {
    setLoading(true);
    setIsError(false);

    const { name, surName, tckn } = data;
    const _iframeSrc = `https://form.jotform.com/230393262424956?userID=${name}-${surName}-${tckn}`;

    const res = await axios.get(
      `https://api.jotform.com/form/230401567881052/submissions?apiKey=38c1f731467c6e32e36eca2c5c&filter={"q4":${tckn}}`
    );

    if (res.data.content.length > 0) {
      setIfrmVisible(true);
      setIfrmSrc(_iframeSrc);
      setLoading(false);
    } else {
      setIsError(true);
      setLoading(false);
    }
  };

  const refresh = () => {
    setTimeStamp(Date.now());
  };

  const logout = () => {
    reset(null);
    setIfrmVisible(false);
    setIfrmSrc(null);
  };
  return (
    <Box flex alignItems={"center"}>
      <Box flex alignItems="center">
        {isIfrmVisible === false ? (
          <Box maxWidth={500}>
            <form
              className={styles.loginForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              {isError && (
                <Alert maxW={500} justifyContent="center" status="error">
                  <AlertIcon />
                  <AlertTitle>
                    Girdiğiniz bilgilerin sisteme erişim yetkisi
                    bulunmamaktadır.
                  </AlertTitle>
                </Alert>
              )}
              <div>
                <label htmlFor="name">Görevli Adı :</label>
                <Input required {...register("name")} />
              </div>
              <div>
                <label htmlFor="surName">Görevli Soyadı :</label>
                <Input required {...register("surName", { required: true })} />
              </div>
              <div>
                <label htmlFor="tckn">Görevli TC No :</label>
                <Input
                  type="number"
                  min="10000000000"
                  max="99999999999"
                  required
                  {...register("tckn")}
                />
              </div>
              <Button type="submit" colorScheme="blue">
                {loading ? "Yükleniyor..." : "Giriş"}
              </Button>
            </form>
          </Box>
        ) : (
          <Flex gap={15} flexDirection="column">
            <Flex justifyContent={"space-between"} gap="20px">
              <Button type="button" colorScheme="green" onClick={refresh}>
                Yeni Kayıt
              </Button>
              <Button type="button" colorScheme="blue" onClick={logout}>
                Çıkış
              </Button>
            </Flex>
            <iframe
              src={ifrmSrc + "&timestamp=" + timeStamp}
              title="Form"
              className="iframe"
            ></iframe>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default LoginForm;
