"use client";
import { Box, Card, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import getPlaceholderImageIfNone from "utils/getPlaceholderImageIfNone";

interface EventCardProps {
  id?: string;
  title: string;
  text: string;
  imageUrl: string;
  date: string;
  type: string;
}

const EventCard = ({ id, title, text, imageUrl, date }: EventCardProps) => {
  const href = id ? `/atividades/${id}` : "#";
  const formattedDate = date
    ? new Date(date).toLocaleDateString("pt-BR")
    : "Data Indefinida";

  return (
    <Card
      as={Link}
      href={href}
      rounded="lg"
      shadow="base"
      w="full"
      h="full"
      transition="all 0.3s ease-in-out"
      _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
    >
      <Flex direction="column" h="full">
        <Box
          position="relative"
          overflow="hidden"
          w="full"
          h="200px"
          rounded="t-lg"
          flexShrink={0}
        >
          <Image
            src={getPlaceholderImageIfNone(imageUrl, 400, 300)}
            alt={title}
            loading="lazy"
            quality={75}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Box>

        <Flex
          p={4}
          w="full"
          direction="column"
          flexGrow={1}
          justifyContent="space-between"
        >
          <Box>
            <Heading as="h3" size="md" mb={2} noOfLines={2}>
              {title}
            </Heading>
            <Text fontSize="md" color="gray.500" mb={4} noOfLines={3}>
              {text}
            </Text>
          </Box>

          <Flex
            justify="space-between"
            align="center"
            mt="auto"
            borderTop="1px solid"
            borderTopColor="gray.100"
            pt={2}
          >
            <Text color="blue.500" fontWeight="semibold" fontSize="sm">
              Detalhes
            </Text>
            <Text fontSize="xs" color="gray.500">
              {formattedDate}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default EventCard;
