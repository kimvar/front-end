import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Layout from "components/Layout";
import AddData from "./AddData";
import EditData from "./EditData";

const DataManagement = () => {
  return (
    <Layout>
      <div>
        <div style={{ width: "100%" }}>
          <Tabs>
            <TabList>
              <Tab>Veri Girişi</Tab>
              <Tab>Veri Düzenle</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <AddData />
              </TabPanel>
              <TabPanel>
                <EditData />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default DataManagement;
