import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

// Type definition for navigation links
interface Link {
  name: string;
  path: string;
}

// Predefined set of navigation links
const Links: Link[] = [
  { name: "Posts", path: "/" },
  { name: "About Me", path: "/aboutme" },
];

// Type definition for navigation link component props
interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

// Component to render individual navigation links
const NavLink: React.FC<NavLinkProps> = ({ children, href }) => (
  <Box
    as="a"
    px={2} // Padding X-axis
    py={1} // Padding Y-axis
    rounded="md" // Rounded corners
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"), // Conditional background on hover
    }}
    href={href}
  >
    {children}
  </Box>
);

// Main navigation bar component
const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // State management for responsive menu

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box as="a" href="/">
              {/* Inline SVG used as the logo */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="8" fill="#4A5568" />
                <text
                  x="20"
                  y="25"
                  textAnchor="middle"
                  fill="white"
                  fontSize="15"
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  Logo
                </text>
              </svg>
            </Box>
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <NavLink key={link.name} href={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <a href="/createPosts">
              {/* Button to add posts */}
              <Button
                variant="solid"
                colorScheme="teal"
                size="sm"
                mr={4}
                leftIcon={<AddIcon />}
              >
                Add Posts
              </Button>
            </a>
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar size="sm" src="data:image/png;base64,..." />
              </MenuButton>
              {/* Dropdown menu items */}
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* Responsive layout for smaller screens */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} href={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
