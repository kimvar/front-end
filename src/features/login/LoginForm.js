import { useForm } from "react-hook-form";

import styles from "./loginForm.module.css";
import { useState } from "react";
import { Button, Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { tcknQuery } from "utils";

function LoginForm() {
  const { register, reset, handleSubmit } = useForm();

  const [ifrmSrc, setIfrmSrc] = useState(null);
  const [isIfrmVisible, setIfrmVisible] = useState(false);
  const [timeStamp, setTimeStamp] = useState(Date.now());
  const onSubmit = (data) => {
    const { name, surName, tckn } = data;
    const _iframeSrc = `https://form.jotform.com/230393262424956?userID=${name}-${surName}-${tckn}`;

    if (!tcknQuery(tckn)) {
      alert("Lütfen geçerli bir T.C. Kimlik Numarası giriniz.");
      return;
    }

    setIfrmVisible(true);
    setIfrmSrc(_iframeSrc);
  };

  const refresh = () => {
    setTimeStamp(Date.now());
  };

  const logout = () => {
    reset(null);
    setIfrmVisible(false);
    ifrmSrc(null);
  };
  return (
    <Box flex alignItems={"center"}>
      <Box flex alignItems="center">
        {isIfrmVisible === false ? (
          <Box maxWidth={550}>
            <form
              className={styles.loginForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label htmlFor="name">Görevli Adı</label>
                <Input required {...register("name")} />
              </div>
              <div>
                <label htmlFor="surName">Görevli Soyadı</label>
                <Input required {...register("surName", { required: true })} />
              </div>
              <div>
                <label htmlFor="tckn">Görevli TC</label>
                <Input
                  minLength={11}
                  maxLength={11}
                  required
                  {...register("tckn")}
                />
              </div>
              <Button type="submit" colorScheme="blue">
                Giriş
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
