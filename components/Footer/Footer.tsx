"use client";
import { Box, Container, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSocialMediaStore } from "app/states";
import { SocialButton } from "components";
import "styles/TextHoverAnimation.css";
import { Love } from "components";
import { ProjetoChancelado } from "public";
import getSocialmediaIcon from "utils/getSocialMediaIcon";
import { contactLinks } from "utils/includeLinks";

const Footer = () => {
  const { getSocialMedia, socialMedia } = useSocialMediaStore((state) => ({
    getSocialMedia: state.getSocialMedia,
    socialMediaLoading: state.socialMediaLoading,
    socialMedia: state.socialMedia,
  }));

  useEffect(() => {
    getSocialMedia();
  }, [getSocialMedia]);

  return (
    <Box
      style={{ backgroundColor: "#F28080" }}
      color={"white"}
      maxWidth="100wh"
      overflowX="hidden"
      id="footer"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        borderBottom={"1px solid"}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Flex
          direction="column"
          alignItems="center"
          as={Link}
          href={contactLinks["Meninas Digitais"]}
          cursor={"pointer"}
        >
          {/* @TODO ADICIONAR LOGO UERGGS E PPGSTEM */}
          <Image
            src={ProjetoChancelado}
            alt="Logo"
            height={150}
            className="transition-transform duration-500 hover:scale-105"
          />
          <Text
            fontWeight={400}
            letterSpacing={1}
            className="hover-underline-animation"
            id="text"
          >
            Projeto chancelado pelo Programa Meninas Digitais
          </Text>
        </Flex>

        <Flex direction="column" gap={4}>
          <Text fontWeight={600} className="tracking-wider" id="text">
            Siga o #Include
          </Text>
          <div className="mb-6 grid grid-cols-3 justify-items-center gap-4 sm:flex-wrap sm:justify-center md:flex">
            {socialMedia.map((socialMedia) => (
              <SocialButton
                key={socialMedia.name}
                size={50}
                label={socialMedia.name}
                href={socialMedia.href}
                animation="rotateHover"
                circle={true}
              >
                {getSocialmediaIcon({
                  socialMedia: socialMedia.name,
                  props: { size: 25 },
                })}
              </SocialButton>
            ))}
          </div>
        </Flex>
      </Container>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={1}
        direction="row"
        spacing={4}
        justify="space-between"
      >
        <Text
          fontWeight={300}
          textAlign="center"
          color={"white"}
          id="text"
          fontSize={"sm"}
        >
          &copy; {new Date().getFullYear()}
          <strong> #Include &lt;gurias&gt;</strong> Todos os direitos reservados
        </Text>
        <Flex align="center" gap={1} id="text" fontSize="md">
          Feito com
          <Love />
          por
          <Link href={contactLinks.creatorSite}>
            <strong className="hover-underline-animation">Lucas Diniz</strong>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
