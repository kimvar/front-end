import React, { useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format as dateFormat } from "date-fns";

import Layout from "components/Layout";
import ErrorMessage from "components/ErrorMessage";
import { FormRenderer } from "components/HookForms/FormRenderer";
import { tcknQuery } from "utils";
import CustomModal from "components/CustomModal";

function RequestList() {
  const [requestData, setRequestData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentItem, setCurrentItem] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      tckn: "",
    },
  });

  const { handleSubmit } = methods;

  const getRequest = async (tckn) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await axios(
        `https://europe-west3-canvas-syntax-367803.cloudfunctions.net/proxy/list-requests?id=${tckn}`
      );

      const content = res.data?.content;
      setRequestData(content);
    } catch (error) {
      setErrorMessage("Beklenmedik bir hata oluştu");
      setRequestData(null);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = ({ tckn }) => {
    getRequest(tckn);
  };

  const schema = {
    id: "person-form",
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

  const handleDetails = (item) => {
    onOpen();
    setCurrentItem(item);
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
              form="person-form"
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="Yükleniyor...">
              Göster
            </Button>
          </Flex>
        </>
      </Box>
      {requestData.length > 0 && (
        <TableContainer mt="10">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Oluşturma Tarihi</Th>
                <Th>Talebi Hangi Kurum Karşılıyor</Th>
                <Th>Talep Sahibi</Th>
                <Th>Talep Sahibi TC Kimlik No</Th>
                <Th>Talep Tipi</Th>
                <Th>Talep Karşılama Kaydını Oluşturan Kişi Tc Kimlik</Th>
                <Th>Talep Karşılama Kaydını Oluşturan Kişi Ad Soyad</Th>
                <Th>Tanım</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {requestData.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>
                      {dateFormat(
                        new Date(item.created_at),
                        "dd.MM.yyyy hh:mm"
                      )}
                    </Td>
                    <Td>{item.answers[3].answer || "-"}</Td>
                    <Td>{item.answers[9].answer || "-"}</Td>
                    <Td>{item.answers[7].answer || "-"}</Td>
                    <Td>{item.answers[11].answer || "-"}</Td>
                    <Td>{item.answers[8].answer || "-"}</Td>
                    <Td>{item.answers[10].answer || "-"}</Td>
                    <Td>{item.answers[4].answer || "-"}</Td>
                    <Td>
                      <Button
                        onClick={() => handleDetails(item)}
                        colorScheme="blue">
                        Detay
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Talep Detay"}
        size="2xl">
        {currentItem.answers ? currentItem.answers[5].answer : ""}
      </CustomModal>
    </Layout>
  );
}

export default RequestList;
