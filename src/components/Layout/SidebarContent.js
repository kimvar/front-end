import {
  Box,
  CloseButton,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import { user } from "utils";

import NavItem from "./NavItem";

const SidebarContent = ({ onClose, ...rest }) => {
  const linkItems = [
    {
      name: "Veri Yönetimi",
      icon: FiUsers,
      to: "/",
      show: user.orgBasedPermission("Diğer"),
    },
    {
      name: "Aile ve Sosyal Hizmetler Kişi Sorgulama",
      icon: FiUsers,
      to: "/",
      show: user.orgBasedPermission("Aile"),
    },
    {
      name: "Kızılay Kişi Sorgulama",
      icon: FiUsers,
      to: "/",
      show: user.orgBasedPermission("Kızılay"),
    },
  ];

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src="assets/images/logo.png"
          alt="Afet İletişim Logo"
          height={58}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems
        .filter((link) => link.show)
        .map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            to={link.to}
            onClick={onClose}
          >
            {link.name}
          </NavItem>
        ))}
    </Box>
  );
};

export default SidebarContent;
