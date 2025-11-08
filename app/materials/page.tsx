"use client";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useMaterialsStore } from "app/states";
import { MaterialCard, Reveal } from "components";
import { ConfettiLight } from "public";
import Material from "types/data/material";

export default function OurMaterials() {
  const { getMaterials, loading, materials } = useMaterialsStore((state) => ({
    getMaterials: state.getMaterials,
    loading: state.materials_loading,
    materials: state.materials,
  }));

  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  return (
    <Flex
      align="center"
      justify="center"
      css={{
        backgroundImage: ConfettiLight,
        backgroundAttachment: "fixed",
      }}
      id="contact"
      m={0}
      pt={100}
    >
      <Box m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }} mt={0}>
            <Reveal animationdirection="bottom">
              <Heading
                fontSize={{
                  base: "4xl",
                  md: "5xl",
                }}
              >
                Materias do Include Gurias
              </Heading>
            </Reveal>
            <Reveal animationdirection="bottom" delay={0.2}>
              <Text
                maxW="6xl"
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                textAlign="center"
              >
                Nós do Include Gurias acreditamos que a tecnologia é uma
                ferramenta poderosa para transformar a vida das pessoas. Por
                isso, desenvolvemos programas de formação e mentoria para
                mulheres que desejam ingressar na área de tecnologia.
              </Text>
            </Reveal>
            <Reveal animationdirection="bottom" delay={0.4}>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={4}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  materials.map((material: Material) => (
                    <GridItem
                      key={material.title}
                      colSpan={{ base: 1, md: 1 }}
                      h={{ base: "full" }}
                    >
                      <MaterialCard
                        title={material.title}
                        description={material.description}
                        isNew={material.isNew}
                        imageUrl={material.imageUrl}
                        href={material.href}
                      />
                    </GridItem>
                  ))
                )}
              </Grid>
            </Reveal>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
