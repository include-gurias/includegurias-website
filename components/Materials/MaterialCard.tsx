"use client";
import { AspectRatio, Badge, Box, Button, Flex } from "@chakra-ui/react";
import { Reveal } from "components";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Material from "types/data/material";
import getPlaceholderImageIfNone from "utils/getPlaceholderImageIfNone";

interface MaterialCardProps extends Material {
  delay: number;
}

const MaterialCard = ({
  title,
  description,
  isNew,
  imageUrl,
  href,
  delay,
}: MaterialCardProps) => {
  return (
    <Link href={href} className="flex size-full items-center justify-center">
      <Reveal animationdirection="bottom" delay={delay} className="h-full">
        <Box
          bg={"red.400"}
          maxW="sm"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          borderRadius="lg"
          h="full"
          shadow="lg"
          position="relative"
          transition={"all 0.3s ease"}
          className="group"
          _hover={{
            boxShadow: "xl",
            transform: "translateY(-5px) scale(1.01)",
          }}
        >
          <AspectRatio
            ratio={16 / 12}
            display={{ base: "none", md: "block" }}
            h="300px"
            w="400"
          >
            <Image
              src={getPlaceholderImageIfNone(imageUrl, 400, 300)}
              fill
              sizes="400 300"
              alt={`Picture of ${title}`}
              className="transition-transform duration-500 group-hover:scale-105"
              style={{ borderRadius: "12px 12px 0 0" }}
            />
          </AspectRatio>
          <Box p="6" h="full">
            <Box
              display="flex"
              alignItems="baseline"
              justifyContent="space-between"
            >
              <Flex h="20px">
                {isNew && (
                  <Badge
                    rounded="full"
                    px="2"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    New
                  </Badge>
                )}
              </Flex>
            </Box>
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {title}
            </Box>

            <Flex justifyContent="space-between" alignContent="center">
              <Box fontSize="md" color={"gray.800"}>
                {description}
              </Box>
            </Flex>
          </Box>
          <Flex justifyContent="center" alignContent="center" my="4">
            <Button
              colorScheme="primary"
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight />}
              color="white"
              _hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
            >
              Saiba mais
            </Button>
          </Flex>
        </Box>
      </Reveal>
    </Link>
  );
};

export default MaterialCard;
