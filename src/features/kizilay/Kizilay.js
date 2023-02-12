import React, { useState } from "react";
import { Box, Divider, Flex, Button } from "@chakra-ui/react";

import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { tcknQuery } from "utils";

import Layout from "components/Layout";
import ErrorMessage from "components/ErrorMessage";
import { FormRenderer } from "components/HookForms/FormRenderer";

const formSchema = yup.object().shape({
  tckn: yup
    .string()
    .required("Bu alan zorunludur.")
    .test(
      "isTcknValid",
      "Lütfen geçerli bir T.C. Kimlik No. giriniz.",
      tcknQuery
    ),
});

const Kizilay = () => {
  const [submissionData, setSubmissionData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      tckn: "",
    },
  });
  const { handleSubmit } = methods;

  const getSubmission = async (tckn) => {
    const answerBlackList = [
      "259",
      "260",
      "250",
      "248",
      "239",
      "235",
      "212",
      "83",
      "78",
      "13",
      "2",
      "63",
      "75",
      "85",
      "224",
      "231",
      "267",
    ];

    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await axios.get(
        `https://europe-west3-canvas-syntax-367803.cloudfunctions.net/proxy/enduser?id=${tckn}`
      );

      const answers = res.data?.content[0]?.answers;

      if (answers) {
        const arr = Object.entries(answers).filter(
          ([key, value]) => answerBlackList.indexOf(key) === -1
        );
        const mapped = arr.map(([key, value]) => value);
        setSubmissionData(mapped);
      } else {
        setErrorMessage("Herhangi bir veri bulunamadı.");
        setSubmissionData(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Beklenmedik bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = ({ tckn }) => {
    getSubmission(tckn);
  };

  const schema = {
    id: "kizilay-form",
    onSubmit: handleSubmit(onSubmit),
    fields: [
      {
        component: "input",
        name: "tckn",
        label: "Depremzede TC No:",
        placeholder: "Depremzede TC No:",
      },
    ],
  };

  return (
    <Layout>
      <Box flex alignItems="center">
        <ErrorMessage message={errorMessage} />
        <>
          <Flex flexDirection="column" gap={15} maxWidth={500}>
            <FormProvider {...methods}>
              <FormRenderer schema={schema}></FormRenderer>
            </FormProvider>
            <Button
              form="kizilay-form"
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="Yükleniyor..."
            >
              Düzenle
            </Button>
          </Flex>
        </>
      </Box>
      <Box mt={10}>
        {submissionData?.length > 0 &&
          submissionData.map((item, i) => (
            <React.Fragment key={i}>
              <Box w="100%" mb={2}>
                <b>{item.text}: </b>
                <span>{item.answer || "-"}</span>
              </Box>
              <Divider mb={2} />
            </React.Fragment>
          ))}
      </Box>
    </Layout>
  );
};

export default Kizilay;
