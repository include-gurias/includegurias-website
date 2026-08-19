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
  Textarea,
  Flex,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { BiSave } from "react-icons/bi";
import { TbPlus, TbUpload } from "react-icons/tb";
import { useMaterialsStore } from "app/states";
import { HeadingText } from "components";
import Material from "types/data/material";
import DeleteButton from "./DeleteButton";

const Materiais = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const [includeMaterials, setIncludeMaterials] = useState<Material[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const loading = useMaterialsStore((state) => state.materials_loading);
  const getMaterials = useMaterialsStore((state) => state.getMaterials);
  const updateMaterials = useMaterialsStore((state) => state.updateMaterials);

  useEffect(() => {
    let isMounted = true;
    getMaterials().then((data) => {
      if (data && isMounted) {
        setIncludeMaterials(data);
      }
    });
    return () => { isMounted = false; };
  }, [getMaterials]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
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

      setIncludeMaterials((prev) =>
        prev.map((mat, i) => (i === index ? { ...mat, imageUrl: data.url } : mat))
      );
      setHasChanged(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer upload da imagem.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    type: keyof Material
  ) => {
    const value = e.target.value;
    setIncludeMaterials((prev) =>
      prev.map((mat, i) => (i === index ? { ...mat, [type]: value } : mat))
    );
    setHasChanged(true);
  };

  const handleSwitchChange = (index: number) => {
    setIncludeMaterials((prev) =>
      prev.map((mat, i) => (i === index ? { ...mat, isNew: !mat.isNew } : mat))
    );
    setHasChanged(true);
  };

  const handleAddMaterial = () => {
    const newMaterial: Material = {
      title: "",
      href: "",
      description: "",
      imageUrl: "#",
      isNew: false,
    };
    setIncludeMaterials((prev) => [...prev, newMaterial]);
    setHasChanged(true);
  };

  const handleDeleteMaterial = (index: number) => {
    setIncludeMaterials((prev) => prev.filter((_, i) => i !== index));
    setHasChanged(true);
  };

  const handleSave = async () => {
    try {
      await updateMaterials(includeMaterials);
      setHasChanged(false);
      alert("Materiais salvos com sucesso!");
    } catch (error) {
      alert("Erro ao salvar materiais.");
    }
  };

  return (
    <Box px={4} display="flex" flexDirection="column" gap={4}>
      <HeadingText align="left" text="Materiais" />
      
      {loading && <Spinner color="red.500" />}

      <Accordion border="1px solid" borderColor="red.400" borderRadius="md" allowToggle>
        {includeMaterials.map((item, index) => (
          <AccordionItem key={`material-${index}`}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {item.title || "Novo Material"}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} display="flex" flexDirection="column" gap={4}>
              <FormControl>
                <FormLabel>Título do Material</FormLabel>
                <Input
                  defaultValue={item.title}
                  onChange={(e) => handleInputChange(e, index, "title")}
                  placeholder="Ex: Guia de React"
                  variant="filled"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Link de Redirecionamento</FormLabel>
                <Input
                  value={item.href}
                  onChange={(e) => handleInputChange(e, index, "href")}
                  placeholder="https://..."
                  variant="filled"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  value={item.description}
                  onChange={(e) => handleInputChange(e, index, "description")}
                  placeholder="Breve descrição..."
                  variant="filled"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Imagem do Material</FormLabel>
                <Flex gap={4} alignItems="center">
                  <Box flexShrink={0}>
                    <Image
                      src={item.imageUrl}
                      alt="Prévia"
                      boxSize="80px"
                      objectFit="cover"
                      borderRadius="md"
                      fallback={
                        <Box boxSize="80px" bg="gray.200" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                          <TbUpload size={24} color="gray" />
                        </Box>
                      }
                    />
                  </Box>

                  <Box>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index)}
                      display="none"
                      id={`upload-${index}`}
                    />
                    <Button
                      as="label"
                      htmlFor={`upload-${index}`}
                      variant="outline"
                      colorScheme="blue"
                      leftIcon={<TbUpload />}
                      cursor="pointer"
                      isLoading={uploadingIndex === index}
                    >
                      Alterar Imagem
                    </Button>
                  </Box>
                </Flex>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Marcar como Novo?</FormLabel>
                <Switch
                  colorScheme="blue"
                  isChecked={item.isNew}
                  onChange={() => handleSwitchChange(index)}
                />
                <Box ml={2}>{item.isNew ? "Sim" : "Não"}</Box>
              </FormControl>

              <Box mt={2}>
                <DeleteButton onDelete={() => handleDeleteMaterial(index)} />
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Stack direction="row" spacing={4} mt={4}>
        <Button
          variant="outline"
          leftIcon={<TbPlus />}
          onClick={handleAddMaterial}
          isDisabled={loading}
          flex={1}
        >
          Adicionar Material
        </Button>
        <Button
          colorScheme="blue"
          rightIcon={<BiSave />}
          isDisabled={!hasChanged || uploadingIndex !== null}
          onClick={handleSave}
          isLoading={loading}
          flex={1}
        >
          Salvar Alterações
        </Button>
      </Stack>
    </Box>
  );
};

export default Materiais;