import React from "react";
import { Icon } from "@iconify/react";
const Iconify = ({ icon, ...others }) => {
  return <Icon icon={icon} {...others}></Icon>;
};

export default React.memo(Iconify);
