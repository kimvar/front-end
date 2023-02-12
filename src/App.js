import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./@router";

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

if (process.env.NODE_ENV === "production") {
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
