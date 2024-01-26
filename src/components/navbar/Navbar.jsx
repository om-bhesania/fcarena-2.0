// Nav.js
import  { useEffect, useState } from "react";
import {
  Box, 
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  Flex,
  useMediaQuery,
  Image,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from '../buttons/Button';
import { MenuItems } from "../Utils/Data";
 

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanLg] = useMediaQuery("(min-width: 850px)");
  const [onScroll, setOnScroll] = useState(false);
  const bgChange = () => {
    if (window.scrollY >= 1069) {
      console.log(window.scrollY);
      setOnScroll(true)
    } else {
      setOnScroll(false)
    }
  }
  const handleToggle = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', bgChange)
    return (
      window.removeEventListener('scroll', bgChange)
    )
  }, [])
  const handleLinkClick = () => {
    if (!isLargerThanLg) {
      onClose();
    }
  };


  return (
    <>
      <Box className="py-[16px] z-[9]">
        <div className="container max-w-[1320px] mx-auto px-[16px]">
          <Stack justify={"space-between"} spacing={5} className="max-w-full">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              className={`${window.location.pathname !== "home"
                ? ` bg-opacity-20 backdrop-filter backdrop-blur-md px-4 py-2 rounded-xl fixed right-0 left-0 lg:mx-[12%] md:mx-[200px] z-[2] ${onScroll ? 'bg-white' : 'bg-black'}`
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
                      className={`px-5 space-x-4 py-2 ${location.pathname === item
                        ? "text-primary" :
                        "text-white"
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
                <Button label={"Book Now"} variant={'primary'} url={'/bookings'} />
                {!isLargerThanLg && (
                  <IconButton
                    icon={
                      <>
                        {isOpen ? (
                          <CloseIcon className="text-3xl" />
                        ) : (
                          <HamburgerIcon className="text-4xl" />
                        )}
                      </>
                    }
                    onClick={handleToggle}
                    className={`cursor-pointer ${!isOpen ? "text-white" : "text-primary"}`}
                  />
                )}

                <Drawer placement="top" onClose={onClose} isOpen={isOpen}  >
                  <DrawerOverlay />
                  <DrawerContent bg='white' pb={4}>
                    <DrawerBody>
                      {!isLargerThanLg && (
                        <div className="text-xl mt-[120px]" />
                      )}
                      {MenuItems.map((item, index) => (
                        <Link
                          key={index}
                          to={`${item.toLowerCase()}`}
                          onClick={handleLinkClick}
                          className={`px-4 py-4 block font-semibold outline-4 text-xl border-b last-of-type:border-0 stroke-1 stroke-black ${location.pathname === item
                            ? "text-secondary"
                            : "text-primary"
                            }`}
                        >
                        <span className="hover:before:block hover:underline-offset-8 hover:underline">
                          {item}

                        </span>
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
