import {
  Box,
  CloseButton,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUser, FiFileText } from "react-icons/fi";
import { user } from "utils";
import { PERMISSIONS } from "@constants";

import NavItem from "./NavItem";

const SidebarContent = ({ onClose, ...rest }) => {
  const linkItems = [
    {
      name: "Veri Yönetimi",
      icon: FiFileText,
      to: "/data-management",
      show: user.hasPermission(PERMISSIONS.VERI_GIREBILIR),
    },
    {
      name: "Kişi Sorgulama",
      icon: FiUser,
      to: "/person-questioning",
      show: user.hasPermission(PERMISSIONS.KISI_SORGULAYABILIR),
    },
    {
      name: "Talep Sorgulama",
      icon: FiUser,
      to: "/request-list",
      show: user.hasPermission(PERMISSIONS.KISI_SORGULAYABILIR),
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
      {...rest}>
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
            onClick={onClose}>
            {link.name}
          </NavItem>
        ))}
    </Box>
  );
};

export default SidebarContent;
