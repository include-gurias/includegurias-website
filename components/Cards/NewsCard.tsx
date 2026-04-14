"use client";
import { Box, Card, Text, Flex } from "@chakra-ui/react"; // Importe o Flex
import Image from "next/image";
import Link from "next/link";
import News from "types/data/news";
import getPlaceholderImageIfNone from "utils/getPlaceholderImageIfNone";

const NewsCard = ({ title, text, imageUrl, href, date }: News) => {
  const formattedDate = date ? new Date(date).toLocaleDateString() : date;

  return (
    <Card
      rounded="lg"
      shadow="base"
      className="group relative w-full transition-shadow duration-300 ease-in-out"
      transition="all 0.3s ease-in-out"
      _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
      w="full"
      h="full"
      as={Flex}
      direction="column"
    >
      <Box
        position="relative"
        overflow="hidden"
        w="full"
        h="200px"
        rounded="t-lg"
        flexShrink={0}
      >
        {imageUrl ? (
          <Image
            src={getPlaceholderImageIfNone(imageUrl, 400, 300)}
            alt={title}
            loading="lazy"
            quality={75}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes={"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="full"
            h="full"
            bg="gray.200"
          >
            <Text fontSize="xl" fontWeight="bold">
              Sem imagem
            </Text>
          </Box>
        )}
      </Box>

      <Flex
        p={4}
        w="full"
        direction="column"
        flexGrow={1}
        justifyContent="space-between"
      >
        <Box>
          <Text id="text" fontSize="lg" fontWeight="bold" mb={2}>
            {title}
          </Text>
          <Text
            id="text"
            fontSize="md"
            color="gray.500"
            mb={4}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {text}
          </Text>
        </Box>

        <Flex
          justify="space-between"
          align="center"
          pt={2}
          borderTop="1px solid"
          borderTopColor="gray.100"
        >
          {href && (
            <Link href={href} className="text-blue-500 hover:underline">
              Leia mais
            </Link>
          )}
          <Text fontSize="sm" color="gray.700">
            {formattedDate}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default NewsCard;
