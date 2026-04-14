"use client";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { HeadingText, Reveal, SeeMoreArrow, WhatWeDoCard } from "components";
import { Clubs, College, Workshops } from "public";

const WhatWeDoCards = [
  {
    image: Workshops,
    title: "Oficinas e materiais",
    text: "Conheça nossos materiais desenvolvidos para algumas oficinas.",
    arrowTxt: "Explore nossos materiais",
    arrowHref: "/materials",
  },
  {
    image: Clubs,
    title: "Igualdade de gênero em STEM",
    text: "Buscamos garantir a participação de meninas de escolas da educação básica com igualdade de oportunidades e acesso às atividades didáticas do projeto, fazendo com que as participantes se interessem pela área das exatas, que ainda é sub-representada.",
    arrowTxt: "Conheça mais",
    arrowHref: "/sobre-nos",
  },
  {
    image: College,
    title: "Divulgação científica",
    text: "Promover a divulgação científica de mulheres em STEM, divulgando suas descobertas e inovações fazendo com que sejam fonte de inspiração para empoderamento de meninas em STEM.",
    arrowTxt: "Inspire-se conosco",
    arrowHref: "/materials/mulheres-na-stem",
  },
];

const WhatWeDoSection = () => {
  return (
    <Box
      p={4}
      maxW={{ base: "100%", md: "9xl" }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
    >
      <Flex direction="column" gap={4} my={8}>
        <HeadingText text="O que nós fazemos?" align="start" />
        <Reveal animationdirection="left" delay={0.3}>
          <Text
            fontSize={{ base: "lg", lg: "xl" }}
            maxW={{ base: "100%", md: "2xl" }}
            textAlign="justify"
            id="text"
          >
            O Projeto Include Gurias visa divulgar a área da STEM despertando o
            interesse de meninas para a área tecnológica e das exatas, através
            do desenvolvimento do pensamento computacional. Buscamos promover e
            incentivar uma maior participação de meninas na area STEM.
            Promovemos atividades como oficinas de programção, eletronica,
            divulgamos olimpiadas de aplicativos visando ampliar o acesso e a
            representatividade feminina nessas áreas. Somos parceiros do
            programa Meninas Digitais da Sociedade Brasileira de Computação.
          </Text>
        </Reveal>
        <SeeMoreArrow text="Saiba Mais" href="/sobre-nos" delay={0.5} />
      </Flex>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={"4em"}
        px={"2rem"}
      >
        {WhatWeDoCards.map((card, index) => (
          <Reveal key={index} animationdirection="bottom" delay={index * 0.2}>
            <WhatWeDoCard
              image={card.image}
              title={card.title}
              text={card.text}
              arrowTxt={card.arrowTxt}
              arrowHref={card.arrowHref}
            />
          </Reveal>
        ))}
      </Grid>
    </Box>
  );
};

export default WhatWeDoSection;
