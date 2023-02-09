import { useForm } from "react-hook-form";

import styles from "./loginForm.module.css";
import { useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

function LoginForm() {
  const { register, handleSubmit } = useForm();

  const [ifrmSrc, setIfrmSrc] = useState("");
  const [isIfrmVisible, setIfrmVisible] = useState(false);

  const onSubmit = (data) => {
    let userID = {
      name: data.name,
      surName: data.surName,
      tc: data.id,
    };

    console.log("data");
    setIfrmVisible(true);
    setIfrmSrc(
      `https://form.jotform.com/230393262424956?userID=${userID.name}-${userID.surName}-${userID.tc}`
    );
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
          <div className="iframe">
            <iframe
              src={ifrmSrc}
              title="Form"
              style={{ height: "100vh", width: "100%" }}
            ></iframe>
          </div>
        )}
      </Box>
    </Box>
  );
}

export default LoginForm;
