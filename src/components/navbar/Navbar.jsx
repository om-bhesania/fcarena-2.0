// Nav.js
import React from "react";
import {
  Box,
  VStack,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  Flex,
  useMediaQuery,
  Image,
  Button,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; 

const MenuItems = ["Home", "About", "Timings", "ContactUs"];

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanLg] = useMediaQuery("(min-width: 806px)");

  const handleLinkClick = () => {
    if (!isLargerThanLg) {
      onClose();
    }
  };

  return (
    <>
      <Box className="py-[16px]">
        <div className="container max-w-[1320px] mx-auto px-[16px]">
          <Stack justify={"space-between"} spacing={5} className="max-w-full">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              className={`${
                window.location.pathname !== "home"
                  ? "bg-white bg-opacity-20 backdrop-filter backdrop-blur-md px-4 py-2 rounded-xl fixed right-0 left-0 mx-[12%]"
                  : "bg-white"
              }`}
            >
              {/* Logo */}
              <Link to="/">
                <Image src={logo} alt="Logo" h="80px" />
              </Link>

              {/* Menu items (conditionally rendered based on screen size) */}
              {isLargerThanLg ? (
                <Flex>
                  {MenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`${item.toLowerCase()}`}
                      onClick={handleLinkClick}
                      className={`px-5 space-x-4 py-2 ${
                        location.pathname === item
                          ? "text-primary" :
                          "text-secondary"
                      } capitalize font-semibold text-[20px]`}
                    >
                      {item}
                    </Link>
                  ))}
                </Flex>
              ) : (
                <></>
              )}

              {/* Bookings button */}

              <Flex gap={"20px"}>
                <Button
                  variant="outline"
                  colorScheme="primary"
                  onClick={() => console.log("Bookings button clicked")}
                  className="outline bg-primary text-bodyTextLight p-3 rounded"
                >
                  Book Now
                </Button>
                {!isLargerThanLg && (
                  <IconButton
                    icon={<HamburgerIcon />}
                    onClick={onOpen}
                    className="cursor-pointer text-3xl"
                  />
                )}

                <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent bg="white" p={4}>
                    <DrawerBody>
                      {!isLargerThanLg && (
                        <Flex justifyContent="flex-end">
                          <CloseIcon
                            onClick={onClose}
                            className="text-xl mt-5"
                          />
                        </Flex>
                      )}
                      {MenuItems.map((item, index) => (
                        <Link
                          key={index}
                          to={`${item.toLowerCase()}`}
                          onClick={handleLinkClick}
                          className={`px-4 py-2 block ${
                            location.pathname === item
                              ? "text-secondary"
                              : "text-primary"
                          }`}
                        >
                          {item}
                        </Link>
                      ))}
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Flex>
            </Flex>
          </Stack>
        </div>
      </Box>
    </>
  );
}
