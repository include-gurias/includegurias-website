"use client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Switch,
  Flex,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { TbPlus, TbUpload } from "react-icons/tb";
import { useNewsStore } from "app/states";
import { HeadingText } from "components";
import News from "types/data/news";
import DeleteButton from "./DeleteButton";

const Noticias = () => {
  const [noticias, setNoticias] = useState<News[]>([]);
  const [hasChanged, setHasChanged] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

const getNews = useNewsStore((state) => state.getNews);
const updateNews = useNewsStore((state) => state.updateNews);
const newsLoading = useNewsStore((state) => state.newsLoading);

useEffect(() => {
  getNews().then((news) => {
    setNoticias(news);
  });
}, [getNews]); // Agora getNews não muda a cada render, fim do loop!

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIndex(index);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Falha no upload");

      const data = await response.json();

      setNoticias((prev) =>
        prev.map((news, i) =>
          i === index ? { ...news, imageUrl: data.url } : news
        )
      );
      setHasChanged(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer upload da imagem.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleAddNews = () => {
    setHasChanged(true);
    const newNews: News = {
      title: "Sem título",
      text: "Sem descrição",
      imageUrl: "",
      href: "",
      date: new Date().toLocaleDateString("pt-BR"),
      showInTimeline: false,
    };
    setNoticias((prev) => [...prev, newNews]);
  };

  const handleDeleteNews = (index: number) => {
    setHasChanged(true);
    setNoticias((prev) => {
      const updatedNoticias = [...prev];
      updatedNoticias.splice(index, 1);
      return updatedNoticias;
    });
  };

  const handleSave = () => {
    updateNews(noticias).then(() => {
      alert("Notícias salvas com sucesso!");
    });
    setHasChanged(false);
  };

  const handleNewsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    type: keyof News
  ) => {
    try {
      if (index < 0 || index >= noticias.length || !noticias[index]) return;
      setNoticias((prev) =>
        prev.map((news, i) =>
          i === index ? { ...news, [type]: e.target.value } : news
        )
      );
      setHasChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSwitchChange = (index: number) => {
    try {
      if (index < 0 || index >= noticias.length || !noticias[index]) return;
      setNoticias((prev) =>
        prev.map((news, i) =>
          i === index
            ? { ...news, showInTimeline: news.showInTimeline ? false : true }
            : news
        )
      );
      setHasChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box px={4} display="flex" flexDirection="column" gap={4}>
      <HeadingText align="left" text="Notícias" />
      {newsLoading ? (
        <Spinner />
      ) : (
        <Accordion
          border={"1px solid"}
          borderColor={"red.400"}
          borderRadius={"md"}
          allowToggle
        >
          {noticias.map((noticia, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {noticia.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel>Título</FormLabel>
                    <Input
                      value={noticia.title}
                      onChange={(e) => handleNewsChange(e, index, "title")}
                      placeholder="Título"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Descrição</FormLabel>
                    <Input
                      defaultValue={noticia.text}
                      onChange={(e) => handleNewsChange(e, index, "text")}
                      placeholder="Descrição"
                    />
                  </FormControl>

                  {/* --- CAMPO DE UPLOAD DA NOTÍCIA --- */}
                  <FormControl>
                    <FormLabel>Imagem da Notícia</FormLabel>
                    <Flex gap={4} alignItems="center">
                      <Box flexShrink={0}>
                        {noticia.imageUrl ? (
                          <Image
                            src={noticia.imageUrl}
                            alt="Prévia"
                            boxSize="80px"
                            objectFit="cover"
                            borderRadius="md"
                            fallback={
                              <Box
                                boxSize="80px"
                                bg="gray.200"
                                borderRadius="md"
                              />
                            }
                          />
                        ) : (
                          <Box
                            boxSize="80px"
                            bg="gray.100"
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <TbUpload size={24} color="gray" />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, index)}
                          display="none"
                          id={`news-upload-${index}`}
                        />
                        <Button
                          as="label"
                          htmlFor={`news-upload-${index}`}
                          variant="outline"
                          colorScheme="blue"
                          leftIcon={<TbUpload />}
                          cursor="pointer"
                          isLoading={uploadingIndex === index}
                        >
                          {noticia.imageUrl ? "Alterar Imagem" : "Fazer Upload"}
                        </Button>
                      </Box>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel>URL</FormLabel>
                    <Input
                      defaultValue={noticia.href || "#"}
                      onChange={(e) => handleNewsChange(e, index, "href")}
                      placeholder="URL da notícia"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Data</FormLabel>
                    <Input
                      defaultValue={noticia.date}
                      onChange={(e) => handleNewsChange(e, index, "date")}
                      placeholder="Data"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Exibir na timeline</FormLabel>
                    <Switch
                      isChecked={noticia.showInTimeline}
                      onChange={() => handleSwitchChange(index)}
                    />
                  </FormControl>
                  <DeleteButton
                    onDelete={() => {
                      handleDeleteNews(index);
                    }}
                  />
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Stack direction="row" spacing={4} justifyContent="between">
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={() => handleAddNews()}
          isDisabled={newsLoading}
        >
          Adicionar Notícia
        </Button>
        <Button
          colorScheme="blue"
          rightIcon={<BiSave />}
          isDisabled={!hasChanged || newsLoading || uploadingIndex !== null}
          onClick={() => handleSave()}
          isLoading={newsLoading}
        >
          Salvar Notícias
        </Button>
      </Stack>
    </Box>
  );
};

export default Noticias;
