import React from "react";
import Iconify from "components/Iconify";

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0000001a",
      }}
    >
      <Iconify icon={"eos-icons:loading"}></Iconify>
    </div>
  );
};

export default LoadingScreen;
