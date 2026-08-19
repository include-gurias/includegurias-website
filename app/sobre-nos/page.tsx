"use client";
import { Box, Flex, Grid, Spinner, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { TbBook } from "react-icons/tb"; // Avalie se ainda vai usar
import { useMaterialsStore, useSocialMediaStore } from "app/states";
import { FounderImage } from "public";

// Importações unificadas e sem duplicatas
import {
  AllPartners,
  AllPeople,
  BolsistasSection,
  HeadingText,
  MaterialCard,
  PrimaryButton,
  SocialButton,
  SubHeadingText,
  SubText,
  TeamForAboutUs,
  MissionValuesCard,
  AboutUsValues,
  TeamWithNoFounder,
  Partners,
  MileStone,
  FounderCard,
  MegaTitle,
} from "components";

import Material from "types/data/material";
import getSocialmediaIcon from "utils/getSocialMediaIcon";

export default function AboutUsAndTeam() {
  // Estados da página original "Quem Somos"
  const [materials] = useMaterialsStore((state) => [state.materials]);
  const { getMaterials, loading } = useMaterialsStore((state) => ({
    getMaterials: state.getMaterials,
    loading: state.materials_loading,
  }));

  const [SocialMediaData] = useSocialMediaStore((state) => [state.socialMedia]);
  const { getSocialMedia } = useSocialMediaStore((state) => ({
    getSocialMedia: state.getSocialMedia,
  }));

  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  useEffect(() => {
    getSocialMedia();
  }, [getSocialMedia]);

  return (
    <div className="mt-[200px] flex w-full flex-col items-center">
      {/* 1. SEÇÃO QUEM SOMOS */}
      <Box
        p={4}
        className="section flex w-full max-w-7xl flex-col items-center"
      >
        <HeadingText text="Quem somos" align={"start"} />
        <SubText
          text="O Projeto Include Gurias foi criado desde 2016 pela profª. Drª Fabrícia Damando Santos, docente da UERGS. O projeto está vinculado ao Curso de Engenharia de Computação - na unidade em Guaíba/RS."
          align={"start"}
          classNames={{ span: "mb-8" }}
        />
        {/* <MissionValuesCard /> */}
      </Box>

      {/* 2. SEÇÃO TRAJETÓRIA E IMPACTO */}
      <Box
        p={4}
        mt={8}
        w="full"
        maxW="7xl"
        className="flex flex-col items-center"
      >
        <HeadingText text="Nossa Trajetória e Impacto" align={"center"} />
        <SubText
          text="Conheça os principais marcos e resultados alcançados pelo Include Gurias."
          align={"center"}
        />
        <MileStone />
      </Box>

      {/* 3. SEÇÃO EQUIPE (Adaptada com fundo cinza para destacar) */}
      <div className="mt-16 flex w-full flex-col items-center bg-gray-100 py-16">
        <Box
          p={4}
          className="section flex w-full max-w-7xl flex-col items-center"
        >
          <MegaTitle
            text="Nossa Equipe"
            classNames={{ text: "text-red-400 mb-4" }}
          />
          <div className="mx-auto my-4 w-96 border-2 border-dashed border-rose-400" />
          <SubText
            text="Nossa equipe é formada por pessoas incríveis que trabalham juntas para fazer a diferença."
            align={"center"}
          />

          <Flex
            justifyContent={"center"}
            flexDirection="column"
            alignItems="center"
            gap={4}
            w="full"
          >
            <TeamWithNoFounder />

            <SubHeadingText
              text="Todas as pessoas que já participaram do Include"
              align={"center"}
              classNames={{ text: "mt-16" }}
            />
            <AllPeople />
          </Flex>
        </Box>
      </div>

      {/* 4. SEÇÃO PARCEIROS */}
      <Box
        p={4}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={16}
        mb={16}
        w="full"
        maxW="7xl"
      >
        <HeadingText text="Parceiros" align={"center"} />
        <SubText
          text="Aqui estão algumas das Empresas, Entidades e pessoas que nos apoiam."
          align={"center"}
        />
        <Flex w="full" mt={8}>
          
          <Partners />

        </Flex>
      </Box>
    </div>
  );
}
