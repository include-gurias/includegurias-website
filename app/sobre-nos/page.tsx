"use client";
import { Box, Flex, Grid, Spinner, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { TbBook } from "react-icons/tb";
import { useMaterialsStore, useSocialMediaStore } from "app/states";
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
  MileStone
} from "components";
import Material from "types/data/material";
import getSocialmediaIcon from "utils/getSocialMediaIcon";

export default function AboutUs() {
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
        <div className="mt-[200px] flex flex-col items-center">
            <Box p={4} className="section">
        <HeadingText text="Quem somos" align={"start"} />
        <SubText
          text="O Projeto Include Gurias foi criado desde 2016 pela profª. Drª Fabrícia Damando Santos, docente da UERGS. O projeto está vinculado ao Curso de Engenharia de Computação - na unidade em Guaíba/RS."
          align={"start"}
          classNames={{
            span: "mb-8",
          }}
        />

        <MissionValuesCard />
      </Box>

            <Box p={4} mt={8} w="full" maxW="7xl">
                <HeadingText text="Nossa Trajetória e Impacto" align={"center"} />
                <SubText
                    text="Conheça os principais marcos e resultados alcançados pelo Include Gurias."
                    align={"center"}
                />
                
                <MileStone /> 

            </Box>
            
            <Box
        p={4}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={8}
      >
        <HeadingText text="Parceiros" align={"center"} />
        <SubText
          text="Aqui estão algumas das Empresas, Entidades e pessoas que nos apoiam."
          align={"center"}
        />
        <Flex w="full">
          {/*fazer carrossel parceiros*/}
                  <AllPartners />
        </Flex>
      </Box>
        </div>
    );
}
