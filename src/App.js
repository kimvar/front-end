import LoginForm from "./features/login/LoginForm";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Box,
} from "@chakra-ui/react";
import EditForm from "features/EditForm";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBTAybHY_w0A9kVQZjlB7H9H35-1bDGGbY",

  authDomain: "kimvar-dev-3b957.firebaseapp.com",

  projectId: "kimvar-dev-3b957",

  storageBucket: "kimvar-dev-3b957.appspot.com",

  messagingSenderId: "418574655888",

  appId: "1:418574655888:web:e6bc6c2c821fcaf35c9315",

  measurementId: "G-R1C261371H",
};

const app = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "PRODUCTION") {
  getAnalytics(app);
}

function App() {
  return (
    <div>
      <Box padding="15px">
        <Heading>Afet İletişim</Heading>
      </Box>
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
              <EditForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
