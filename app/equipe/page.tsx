import { Box, Flex } from "@chakra-ui/react";
import {
  AllPeople,
  BolsistasSection,
  FounderCard,
  MegaTitle,
  SubHeadingText,
  SubText,
  TeamWithNoFounder,
} from "components";
import { FounderImage } from "public";

export default function TeamSection() {
  return (
    <div className="mt-[100px] flex min-h-screen w-screen items-center justify-center bg-gray-100">
      <Box p={4} className="section">
        <MegaTitle
          text="Nossa Equipe"
          classNames={{ text: "mt-16 text-red-400 mb-4" }}
        />
        <div
          className={`mx-auto my-4 w-96 border-2 border-dashed border-rose-400`}
        />

        <SubText
          text="Nossa equipe é formada por pessoas incríveis que trabalham juntas para fazer a diferença."
          align={"center"}
        />
        <Flex
          justifyContent={"center"}
          flexDirection="column"
          alignItems="center"
          gap={4}
          mb={16}
        >

         {/*<SubHeadingText
            text="????"
            align={"center"}
            classNames={{ text: "mt-16" }}
          />
          */} 
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
  );
}
