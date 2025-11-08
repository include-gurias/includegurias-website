import { Box, SimpleGrid, Text, Heading, Stack, Icon } from "@chakra-ui/react";
import missionValues from "data/missionValues";

export default function MissionValuesCard() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} className="mt-6">
      {missionValues.map((item) => (
        <Box
          key={item.id}
          borderRadius="md"
          boxShadow="sm"
          p={4}
          bg="white"
          role="group"
        >
          <Stack direction="row" spacing={3} align="center">
            <Icon as={item.icon} boxSize={6} color="brand.500" />
            <Heading size="sm">{item.title}</Heading>
          </Stack>
          <Text mt={2}>{item.text}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}