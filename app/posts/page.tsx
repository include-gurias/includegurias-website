// PostsPage.tsx
"use client";
import { Button, Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";
import { HeadingText, SocialMediaCard } from "components";
import { useEffect } from "react";
import { useSocialMediaPostsStore } from "app/states"; 

const PostsPage = () => {
  const { getSocialMediaPosts, socialMediaPosts } = useSocialMediaPostsStore((state) => ({
    getSocialMediaPosts: state.getSocialMediaPosts,
    socialMediaPosts: state.socialMediaPosts,
  }));

  useEffect(() => {
    if (socialMediaPosts.length === 0) {
      getSocialMediaPosts();
    }
  }, [getSocialMediaPosts, socialMediaPosts.length]);

  if (socialMediaPosts.length === 0) {
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
        <HeadingText text="Carregando Publicações..." />
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
      <HeadingText text="Todas as Publicações" align="center" />

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={8}
        w="full"
        px={4}
      >
        {socialMediaPosts.map((post, index) => (
          <GridItem key={index} w="full">
            <SocialMediaCard
              text={post.text}
              imageUrl={post.imageUrl}
              name={post.name}
              subname={post.subname}
              socialMedia={post.socialMedia}
            />
          </GridItem>
        ))}
      </Grid>
      
      <Link href="/">
        <Button
            mt={4}
                className="rounded-xl bg-rose-500 px-6 py-3 font-bold text-white hover:bg-rose-700 transition-colors mt-12 shadow-md"
                size="md"
                >
                  Voltar para Início
                </Button>
      </Link>
    </Container>
  );
};

export default PostsPage;