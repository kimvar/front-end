import { useForm } from "react-hook-form";

import styles from "./loginForm.module.css";
import { useState } from "react";
import { Button, Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

function LoginForm() {
  const { register, reset, handleSubmit } = useForm();

  const [ifrmSrc, setIfrmSrc] = useState(null);
  const [isIfrmVisible, setIfrmVisible] = useState(false);

  const onSubmit = (data) => {
    let userID = {
      name: data.name,
      surName: data.surName,
      tc: data.id,
    };

    setIfrmVisible(true);
    setIfrmSrc(
      `https://form.jotform.com/230393262424956?userID=${userID.name}-${userID.surName}-${userID.tc}`
    );
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
                <label htmlFor="id">Görevli TC</label>
                <Input required {...register("id")} />
              </div>
              <Button type="submit" colorScheme="blue">
                Giriş
              </Button>
            </form>
          </Box>
        ) : (
          <Flex gap={15} flexDirection="column">
            <Flex justifyContent={"flex-end"}>
              <Button type="submit" colorScheme="blue" onClick={logout}>
                Çıkış
              </Button>
            </Flex>
            <iframe src={ifrmSrc} title="Form" className="iframe"></iframe>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default LoginForm;
