import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format as dateFormat } from "date-fns";

import Layout from "components/Layout";
import ErrorMessage from "components/ErrorMessage";
import { FormRenderer } from "components/HookForms/FormRenderer";
import { tcknQuery, user } from "utils";
import CustomModal from "components/CustomModal";

function RequestList() {
  const [requestData, setRequestData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentItem, setCurrentItem] = useState({});
  const [currentEndUser, setCurrentEndUser] = useState(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

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
    setRequestData([]);
    setCurrentEndUser(null);

    try {
      const endUserRes = await axios.get(
        `https://europe-west3-canvas-syntax-367803.cloudfunctions.net/proxy/enduser?id=${tckn}`
      );
      const endUserContent = endUserRes.data.content[0];

      if (!endUserRes.data.content[0]) {
        setErrorMessage(
          "Talep sorgulama/ekleme yapabilmek için öncelikle kişiyi sisteme eklemeniz gerekmektedir."
        );
        return;
      }

      const obj = {
        name: endUserContent.answers[76].answer?.first || "-",
        lastname: endUserContent.answers[76].answer?.last || "-",
        district: endUserContent.answers[284].answer || "-",
        phone: endUserContent.answers[21].answer || "-",
        tckn,
      };

      setCurrentEndUser(obj);

      const res = await axios(
        `https://europe-west3-canvas-syntax-367803.cloudfunctions.net/proxy/list-requests?id=${tckn}`
      );

      const content = res.data?.content;
      setRequestData(content);
    } catch (error) {
      setErrorMessage("Beklenmedik bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = ({ tckn }) => {
    getRequest(tckn);
  };

  const schema = {
    id: "request-form",
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
    setDetailsModalOpen(true);
    setCurrentItem(item);
  };

  return (
    <Layout>
      <Box flex alignItems="center">
        <ErrorMessage message={errorMessage} />
        <>
          <Flex justifyContent="space-between">
            <Flex flexDirection="column" gap={15} w={500}>
              <FormProvider {...methods}>
                <FormRenderer schema={schema}></FormRenderer>
              </FormProvider>
              <Button
                form="request-form"
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Yükleniyor..."
              >
                Göster
              </Button>
            </Flex>
            {currentEndUser && (
              <Button
                type="button"
                colorScheme="green"
                onClick={() => setAddModalOpen(true)}
              >
                Talep Ekle
              </Button>
            )}
          </Flex>
        </>
      </Box>
      {currentEndUser && (
        <Box shadow="dark-lg" mt={5} p={3}>
          <h4>
            <div>
              <b>Ad Soyad : </b>
              <span>
                {currentEndUser.name} {currentEndUser.lastname}
              </span>
            </div>
            <div>
              <b>Yerleştiği İlçe : </b> <span>{currentEndUser.district}</span>
            </div>
            <div>
              <b>Telefon : </b>
              <span>{currentEndUser.phone}</span>
            </div>
          </h4>
        </Box>
      )}
      {requestData.length > 0 && (
        <TableContainer mt="5">
          <Table variant="simple" style={{ whiteSpace: "normal" }}>
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
                        type="button"
                        onClick={() => handleDetails(item)}
                        colorScheme="blue"
                      >
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
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title={"Talep Detay"}
        size="5xl"
      >
        {currentItem.answers ? currentItem.answers[5].answer : ""}
      </CustomModal>
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        title={"Talep Ekle"}
        size="5xl"
      >
        {currentEndUser && (
          <iframe
            style={{ width: "100%", height: "calc(100vh - 120px)" }}
            src={`https://europe-west3-canvas-syntax-367803.cloudfunctions.net/proxy/add-request?talepSahibiAdSoyad=${currentEndUser.name}-${currentEndUser.lastname}&talepSahibiTcKimlik=${currentEndUser.tckn}&talepKarsilayanKisiAdSoyad=${user.credantials.name}-${user.credantials.lastname}&talepKarsilayanKisiTcKimlik=${user.credantials.tckn}`}
            frameBorder="0"
            title="Talep Form"
          ></iframe>
        )}
      </CustomModal>
    </Layout>
  );
}

export default RequestList;
