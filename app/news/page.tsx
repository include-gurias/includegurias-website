"use client";
import { Button, Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";
import { HeadingText, NewsCard } from "components";
import { useNewsStore } from "app/states";
import { useEffect } from "react";

const News = () => {
  const { getNews, news } = useNewsStore((state) => ({
    getNews: state.getNews,
    news: state.news,
  }));

  useEffect(() => {
    if (news.length === 0) {
      getNews();
    }
  }, [getNews, news.length]);

  if (news.length === 0) {
    return (
      <Container
        as={Flex}
        py={4}
        direction="column"
        align="center"
        justify="center"
        minH={"90vh"}
        mt={24}
      >
        <HeadingText text="Carregando Notícias..." />
      </Container>
    );
  }

  return (
    <Container
      as={Flex}
      py={4}
      direction="column"
      align="center"
      justify="start"
      className="container"
      minH={"90vh"}
      w={"full"}
      h={"full"}
      mt={24}
      mb={10}
      maxW="7xl"
    >
      <HeadingText text="Todas as Notícias" align="center" />

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={8}
        w="full"
        px={4}
      >
        {news.map((item, index) => (
          <GridItem key={index} w="full">
            <NewsCard {...item} />
          </GridItem>
        ))}
      </Grid>

      <Link href="/">
        <Button
          mt={4}
          className="mt-12 rounded-xl bg-rose-500 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-rose-700"
          size="md"
        >
          Voltar para Início
        </Button>
      </Link>
    </Container>
  );
};

export default News;
