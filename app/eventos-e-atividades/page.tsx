"use client";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Spinner,
  GridItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { HeadingText, EventCard } from "components";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect } from "react";
import type { Activity, ActivityType } from "types/data/activities";
import { useActivitiesStore } from "app/states";

interface SectionRendererProps {
  title: string;
  typeKey: ActivityType; // ✅ AQUI
  description: string;
  activities: Activity[];
  isLoading: boolean;
}

const SectionRenderer = ({
  title,
  typeKey,
  description,
  activities,
  isLoading,
}: SectionRendererProps) => {
  const filteredEvents = activities.filter((e) => e.type === typeKey);

  if (isLoading && filteredEvents.length === 0) {
    return (
      <Box w="full" textAlign="center" py={10}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (filteredEvents.length === 0 && !isLoading) {
    return (
      <Box mb={10} w="full">
        <Heading
          as="h2"
          size="xl"
          mb={4}
          color="gray.700"
          fontWeight="semibold"
        >
          {title}
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          {description}
        </Text>
        <Text fontSize="md" color="gray.500" mt={4}>
          Nenhuma atividade de {title.toLowerCase()} encontrada no momento.
        </Text>
      </Box>
    );
  }

  return (
    <Box mb={10} w="full">
      <Heading as="h2" size="xl" mb={4} color="gray.700" fontWeight="semibold">
        {title}
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        {description}
      </Text>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        w="full"
      >
        {filteredEvents.map((item) => (
          <GridItem key={item.id} w="full">
            <EventCard
              type={item.type}
              title={item.title}
              text={item.description}
              imageUrl={item.imageUrl}
              date={item.date}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

const EventsActivities = () => {
  const { getActivities, activities, activitiesLoading } = useActivitiesStore();

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  if (activitiesLoading && activities.length === 0) {
    return (
      <Container
        as={Flex}
        direction="column"
        align="center"
        justify="center"
        minH={"100vh"}
      >
        <Spinner size="xl" color="red.500" />
        <Text mt={4}>Carregando eventos e atividades...</Text>
      </Container>
    );
  }

  return (
    <Container
      as={Flex}
      direction="column"
      align="center"
      justify="start"
      minH={"90vh"}
      w={"full"}
      mt={24}
      mb={10}
      maxW="7xl"
      px={4}
    >
      <HeadingText text="Eventos e Atividades" align="center" />

      <Link href="/">
        <Button
          variant="ghost"
          colorScheme="blue"
          leftIcon={<IoIosArrowBack />}
          mb={8}
        >
          Voltar para a página inicial
        </Button>
      </Link>

      <SectionRenderer
        title="Oficinas"
        typeKey="oficina"
        description="Conheça e participe de nossas oficinas de programação, eletrônica e mais."
        activities={activities}
        isLoading={activitiesLoading}
      />

      <SectionRenderer
        title="Visitas Técnicas"
        typeKey="visitaTecnica"
        description="Confira os locais e empresas que visitamos para inspirar nossas gurias."
        activities={activities}
        isLoading={activitiesLoading}
      />

      <SectionRenderer
        title="Cursos"
        typeKey="curso"
        description="Informações sobre os cursos oferecidos pelo projeto Include Gurias."
        activities={activities}
        isLoading={activitiesLoading}
      />
    </Container>
  );
};

export default EventsActivities;
