"use client";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";
import { useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { HeaderMotion, LogoMotion } from "./HeaderMotion";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <HeaderMotion>
      <>
        <Flex
          py={{ base: 2 }}
          px={{ base: 4 }}
          justify="center"
          alignItems="center"
          h="full"
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <IoClose size={35} /> : <RxHamburgerMenu size={35} />
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>

          <Flex
            w="100%"
            align={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <LogoMotion />

            <Flex w={"100%"}>
              <DesktopNav />
            </Flex>
          </Flex>

          {/* <Flex>
            <LanguageSelector language={language} />
          </Flex> */}
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </>
    </HeaderMotion>
  );
}

const DesktopNav = () => {
  return (
    <Stack
      direction={"row"}
      spacing={4}
      align={"center"}
      justify={"center"}
      style={{ width: "100%" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"}>
            <PopoverTrigger>
              <Link href={navItem.href}>
                <Box
                  p={2}
                  fontSize={"lg"}
                  fontWeight={500}
                  id="text"
                  transition={"all .1s ease"}
                  _hover={{
                    textDecoration: "none",
                    color: "#62676f",
                    textDecor: "underline",
                    scale: "1.1",
                  }}
                >
                  {navItem.label}
                  {navItem.children && (
                    <Icon as={GoChevronDown} w={5} h={5} ml={1} />
                  )}
                </Box>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                p={4}
                rounded={"xl"}
                minW={"sm"}
                bg={"var(--primary-200)"}
              >
                <PopoverBody>
                  {navItem.children.map((child) => (
                    <Link href={child.href} key={child.label}>
                      <DesktopSubNav {...child} />
                    </Link>
                  ))}
                </PopoverBody>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, subLabel }: NavItem) => {
  return (
    <Box role={"group"} display={"block"} p={2} rounded={"md"}>
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "#62676f" }}
            color={"white"}
            fontWeight={600}
          >
            {label}
          </Text>
          {subLabel && <Text fontSize={"lg"}>{subLabel}</Text>}
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <FaChevronRight size={15} color={"white"} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack p={4} display={{ md: "none" }} bg={"var(--primary-300)"}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          label={navItem.label}
          href={navItem.href}
        >
          {navItem.children}
        </MobileNavItem>
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Link href={href} key={label}>
        <Box
          py={2}
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text fontWeight={600}>{`${label}`}</Text>
          {children && (
            <Icon
              as={FaChevronDown}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Box>
      </Link>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link href={href} key={child.label}>
                {`${child.label}`}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Início",
    href: "/",
  },
  {
    label: "Nossos Materiais",
    href: "/materials",
  },
  {
    label: "Sobre nós",
    href: "#",
    children: [
      {
        label: "Quem somos",
        href: "/sobre-nos",
      },
      {
        label: "Equipe",
        href: "/equipe",
      },
    ],
  },
 // {
  //  label: "Eventos e Atividades",
  //  href: "/eventos-e-atividades",
 // },
  {
    label: "Contato",
    href: "/contato",
  },
];
