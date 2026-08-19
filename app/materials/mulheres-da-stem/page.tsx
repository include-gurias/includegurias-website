"use client";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { HeadingText, Reveal, SearchBar, WomanCard } from "components";
import Link from "next/link";
import { ConfettiLight } from "public";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { womanType } from "types/woman";
import { tagColors } from "utils/getTagColors";
import { contactLinks } from "utils/includeLinks";
import { toCamelCase } from "utils/stringFunctions";
import { fetchGurias, fetchImage, fetchTags } from "utils/webService";

const TagsSelecionadas = ({ selectedTags }: { selectedTags: string[] }) => {
  return (
    <Wrap>
      {selectedTags &&
        selectedTags.map((tag, index) => (
          <Reveal key={index}>
            <WrapItem key={index}>
              <Badge
                colorScheme={tagColors[tag as keyof typeof tagColors] || "teal"}
              >
                {tag}
              </Badge>
            </WrapItem>
          </Reveal>
        ))}
    </Wrap>
  );
};

const MulheresNasExatas = () => {
  const [gurias, setGurias] = useState<womanType[]>([]);
  const [filteredGurias, setFilteredGurias] = useState<womanType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const clearSearch = () => {
    setSearchValue("");
    setSelectedTags([]);
  };

  const getImage = (name: string, images: string[]) => {
    const imageIndex = gurias.findIndex((guria) => guria.name === name);
    const image = images[imageIndex];
    return image;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guriasData, tagsData] = await Promise.all([
          fetchGurias(),
          fetchTags(),
        ]);

        setGurias(guriasData);
        setFilteredGurias(guriasData);
        setTags(tagsData);

        // Mapear gurias para um array de promessas de imagens
        const imagePromises = guriasData.map(async (guria) => {
          try {
            const guriaName = toCamelCase(guria.name);
            const imageData = await fetchImage(guriaName);
            return imageData;
          } catch (error) {
            console.error("Erro ao carregar imagem para", guria.name, error);
            return null;
          }
        });

        // Aguardar todas as promessas de imagens serem resolvidas usando Promise.all
        const imagesData = await Promise.all(imagePromises);
        setImages(imagesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterGurias = () => {
      const filteredGurias = gurias.filter((guria) => {
        const name = guria.name.toLowerCase();
        const searchValueLower = searchValue.toLowerCase();

        const nameMatches = name.includes(searchValueLower);

        const tagsMatches = selectedTags.every((tag) =>
          guria.tags.includes(tag)
        );

        if (selectedTags.length === 0) {
          return nameMatches;
        }

        return nameMatches && tagsMatches;
      });

      setFilteredGurias(filteredGurias);
    };

    filterGurias();
  }, [selectedTags, searchValue, gurias]);

  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      css={{
        backgroundImage: ConfettiLight,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="section mt-28 flex w-full flex-col items-center gap-2">
        <HeadingText text="Mulheres da STEM" align="center" />
        <p id="text" className="text-center text-xl">
          Conheça as mulheres que fizeram história nas áreas de Ciência,
          Tecnologia, Engenharia e Matemática! Clique sobre a imagem para saber
          mais sobre a vida e a carreira de cada uma delas.{" "}
        </p>
        {/* Falar que temos os cards fisicamente, PDF (disponibilizar o link) e no chatbot (link) */}
        <span className="text-md text-center" id="text">
          Os cards também estão disponíveis fisicamente, em{" "}
          <Link
            className="text-blue-500 underline hover:text-blue-700"
            href="#@TODO adicionar link cards"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            PDF
          </Link>{" "}
          e no{" "}
          <Link
            href={contactLinks.Chatbot}
            className="text-blue-500 underline hover:text-blue-700"
            target="_blank"
            rel="noreferrer"
          >
            chatbot
          </Link>
          .
        </span>

        <Divider
          orientation="horizontal"
          w="100%"
          mb={4}
          borderColor={"red.400"}
          opacity={0.1}
        />
        <SearchBar
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div
          className={`flex max-w-6xl gap-4 border-2 border-transparent pl-4 ${selectedTags ? "h-125px" : "h-0"} my-4`}
          style={{ transition: "all ease-in-out 0.5s" }}
        >
          {selectedTags && selectedTags.length > 0 && (
            <Reveal className="flex w-full flex-row items-center gap-4 border-2 px-8 py-4">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="white"
                alignSelf="center"
              >
                Tags
              </Text>
              <TagsSelecionadas selectedTags={selectedTags} />
              <Button
                onClick={() => setSelectedTags([])}
                type="button"
                colorScheme="red"
                p={6}
                variant="outline"
                borderColor={"white"}
                color="white"
                _hover={{ bg: "red.500" }}
                alignSelf="center"
              >
                <AiFillDelete />
                Limpar Filtros
              </Button>
            </Reveal>
          )}
        </div>
        <div className="md:w-8xl mb-8 flex w-full flex-col items-center justify-center">
          <Wrap spacing={4} mb={8} zIndex={1} justify="center">
            {gurias && gurias.length > 0 ? (
              <>
                {filteredGurias.length > 0 ? (
                  <>
                    {filteredGurias.map(
                      (womanData: womanType, index: number) => (
                        <Reveal
                          delay={
                            index === 0 || index % 4 === 0
                              ? 0
                              : 0.1 * (index % 4)
                          }
                          key={womanData.name}
                        >
                          <WomanCard
                            key={womanData.name}
                            name={womanData.name}
                            imageUrl={getImage(womanData.name, images)}
                            tags={womanData.tags}
                            index={index}
                          />
                        </Reveal>
                      )
                    )}
                  </>
                ) : (
                  <Card
                    bg="gray.700"
                    w="full"
                    h="full"
                    borderRadius="xl"
                    overflow="hidden"
                    position="relative"
                    transition="transform 0.2s ease-in-out"
                    zIndex="1"
                    _hover={{ transform: "scale(1.05)" }}
                    onClick={() => clearSearch()}
                    className="flex size-full flex-col items-center justify-center"
                  >
                    <CardBody fontSize="xl" color="white">
                      Nenhuma mulher encontrada com esses filtros :(
                    </CardBody>
                  </Card>
                )}
              </>
            ) : (
              <div className="flex size-full  items-center justify-center">
                <Spinner size="lg" />
              </div>
            )}
          </Wrap>
        </div>
      </div>
    </Flex>
  );
};
export default MulheresNasExatas;
