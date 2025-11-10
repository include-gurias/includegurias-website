"use client";
import { Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Reveal } from "components";
import { ABOUT_US_VALUES } from "data";

const AboutUsValues = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      justifyItems={"center"}
      gap={4}
      my={8}
    >
      {ABOUT_US_VALUES.map((item) => (
        <GridItem key={item.id} maxW="300px" h="fit-content" p={4} w="100%">
          <Reveal animationdirection="left" delay={0.3}>
            <Flex direction="column" h="full">
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color={"black"}
                textAlign="start"
                mb={4}
              >
                {item.title}
              </Text>

              <Text
                fontSize="lg"
                fontWeight="thin"
                h="fit-content"
                textAlign="start"
                color={"black"}
              >
                {item.description}
              </Text>
            </Flex>
          </Reveal>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default AboutUsValues;
