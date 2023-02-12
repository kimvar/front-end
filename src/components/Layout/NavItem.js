import { Flex, Link, Icon } from "@chakra-ui/react";
import { Link as ReachLink, useLocation } from "react-router-dom";

const activeStyles = {
  color: "green",
  borderColor: "green",
};

const NavItem = ({ icon, children, to, ...rest }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      as={ReachLink}
      to={to}
      style={{
        textDecoration: "none",
      }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "green.100",
          color: "green.900",
        }}
        style={{
          border: "1px solid transparent",
          ...(isActive && activeStyles),
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "green.900",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
