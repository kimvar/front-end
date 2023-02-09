import LoginForm from "./features/login/LoginForm";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
} from "@chakra-ui/react";
import EditForm from "features/EditForm";

function App() {
  return (
    <div>
      <Heading>Afet İletişim</Heading>

      <div style={{ width: "100%" }} className="App">
        <Tabs>
          <TabList>
            <Tab>Veri Girişi</Tab>
            <Tab>Veri Düzenle</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              {" "}
              <EditForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
