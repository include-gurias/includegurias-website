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
  useStyleConfig,
  Flex,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { TbPlus, TbUpload } from "react-icons/tb";
import { HeadingText } from "components";
import DeleteButton from "./DeleteButton";
import { useActivitiesStore } from "app/states";
import Activity from "types/data/activities";

const TIPOS_ATIVIDADE = [
  { value: "oficina", label: "Oficina" },
  { value: "visitaTecnica", label: "Visita Técnica" },
  { value: "curso", label: "Curso" },
  { value: "live", label: "Live" },
  { value: "palestra", label: "Palestra" },
  { value: "escolaParceira", label: "Escola Parceira" },
];

const EventsActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [hasChanged, setHasChanged] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const selectStyles = useStyleConfig("Input", {});

const getActivities = useActivitiesStore((state) => state.getActivities);
const updateActivities = useActivitiesStore((state) => state.updateActivities);
const activitiesLoading = useActivitiesStore((state) => state.activitiesLoading);

useEffect(() => {
  getActivities().then((data: Activity[]) => {
    setActivities(data);
  });
}, [getActivities]); // Agora a referência é estável!

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

      setActivities((prev) =>
        prev.map((activity, i) =>
          i === index ? { ...activity, imageUrl: data.url } : activity
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

  const handleAddActivity = () => {
    setHasChanged(true);
    const newActivity: Activity = {
      title: "Nova Atividade (Sem Título)",
      type: "oficina",
      description: "Descreva a atividade...",
      imageUrl: "",
      date: new Date().toISOString().substring(0, 10),
      showOnHomepage: false,
      details: {},
    } as Activity;
    setActivities((prev) => [...prev, newActivity]);
  };

  const handleDeleteActivity = (index: number) => {
    setHasChanged(true);
    setActivities((prev) => {
      const updatedActivities = [...prev];
      updatedActivities.splice(index, 1);
      return updatedActivities;
    });
  };

  const handleSave = () => {
    updateActivities(activities).then(() => {
      alert("Atividades salvas com sucesso!");
    });
    setHasChanged(false);
  };

  const handleActivityChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number,
    field: keyof Activity
  ) => {
    setActivities((prev) =>
      prev.map((activity, i) =>
        i === index ? { ...activity, [field]: e.target.value } : activity
      )
    );
    setHasChanged(true);
  };

  const handleDetailsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    detailKey: string
  ) => {
    setActivities((prev) =>
      prev.map((activity, i) =>
        i === index
          ? {
              ...activity,
              details: { ...activity.details, [detailKey]: e.target.value },
            }
          : activity
      )
    );
    setHasChanged(true);
  };

  const handleSwitchChange = (index: number) => {
    setActivities((prev) =>
      prev.map((activity, i) =>
        i === index
          ? {
              ...activity,
              showOnHomepage: !activity.showOnHomepage,
            }
          : activity
      )
    );
    setHasChanged(true);
  };

  const renderCamposEspecificos = (activity: Activity, index: number) => {
    const detailValue = (key: string) =>
      activity.details && activity.details[key] ? activity.details[key] : "";

    switch (activity.type) {
      case "oficina":
      case "curso":
        return (
          <Stack spacing={4} p={4} bg="orange.50" borderRadius="md">
            <FormLabel fontWeight="bold" color="orange.600">
              Detalhes de Ensino
            </FormLabel>
            <Input
              defaultValue={detailValue("duracao")}
              onChange={(e) => handleDetailsChange(e, index, "duracao")}
              placeholder="Duração (ex: 4 horas)"
            />
            <Input
              defaultValue={detailValue("prerequisitos")}
              onChange={(e) => handleDetailsChange(e, index, "prerequisitos")}
              placeholder="Pré-requisitos"
            />
          </Stack>
        );
      case "visitaTecnica":
        return (
          <Stack spacing={4} p={4} bg="teal.50" borderRadius="md">
            <FormLabel fontWeight="bold" color="teal.600">
              Detalhes da Visita
            </FormLabel>
            <Input
              defaultValue={detailValue("empresaVisitada")}
              onChange={(e) => handleDetailsChange(e, index, "empresaVisitada")}
              placeholder="Empresa Visitada"
            />
            <Input
              defaultValue={detailValue("limiteVagas")}
              onChange={(e) => handleDetailsChange(e, index, "limiteVagas")}
              placeholder="Limite de Vagas"
              type="number"
            />
          </Stack>
        );
      case "live":
      case "palestra":
        return (
          <Stack spacing={4} p={4} bg="blue.50" borderRadius="md">
            <FormLabel fontWeight="bold" color="blue.600">
              Detalhes da Transmissão
            </FormLabel>
            <Input
              defaultValue={detailValue("palestranteOuConvidado")}
              onChange={(e) =>
                handleDetailsChange(e, index, "palestranteOuConvidado")
              }
              placeholder="Palestrante/Convidado"
            />
            <Input
              defaultValue={detailValue("linkGravacao")}
              onChange={(e) => handleDetailsChange(e, index, "linkGravacao")}
              placeholder="URL da Gravação"
            />
          </Stack>
        );
      case "escolaParceira":
        return (
          <Stack spacing={4} p={4} bg="green.50" borderRadius="md">
            <FormLabel fontWeight="bold" color="green.600">
              Detalhes da Parceria
            </FormLabel>
            <Input
              defaultValue={detailValue("nomeEscola")}
              onChange={(e) => handleDetailsChange(e, index, "nomeEscola")}
              placeholder="Nome da Escola"
            />
            <Textarea
              defaultValue={detailValue("detalhesParceria")}
              onChange={(e) =>
                handleDetailsChange(e, index, "detalhesParceria")
              }
              placeholder="Detalhes da colaboração"
            />
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      px={4}
      display="flex"
      flexDirection="column"
      gap={6}
      bg="gray.50"
      minH="100vh"
      py={8}
    >
      <HeadingText align="left" text="Eventos e Atividades" />

      {activitiesLoading ? (
        <Spinner />
      ) : (
        <Accordion
          border={"1px solid"}
          borderColor={"red.400"}
          borderRadius={"md"}
          allowToggle
        >
          {activities.map((activity, index) => (
            <AccordionItem key={activity.id || index} borderTopWidth="1px">
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {activity.title} (
                    {TIPOS_ATIVIDADE.find((t) => t.value === activity.type)
                      ?.label || "Sem Tipo"}
                    )
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel fontWeight="semibold">
                      Tipo de Atividade
                    </FormLabel>
                    <Box
                      as="select"
                      value={activity.type}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        handleActivityChange(e, index, "type")
                      }
                      sx={selectStyles}
                    >
                      {TIPOS_ATIVIDADE.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </option>
                      ))}
                    </Box>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Título</FormLabel>
                    <Input
                      defaultValue={activity.title}
                      onChange={(e) => handleActivityChange(e, index, "title")}
                      placeholder="Título da Atividade"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea
                      defaultValue={activity.description}
                      onChange={(e) =>
                        handleActivityChange(e, index, "description")
                      }
                      placeholder="Descrição detalhada"
                      rows={3}
                    />
                  </FormControl>

                  {/* --- CAMPO DE UPLOAD DA IMAGEM --- */}
                  <FormControl>
                    <FormLabel>Imagem de Capa</FormLabel>
                    <Flex gap={4} alignItems="center">
                      <Box flexShrink={0}>
                        {activity.imageUrl ? (
                          <Image
                            src={activity.imageUrl}
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
                          id={`activity-upload-${index}`}
                        />
                        <Button
                          as="label"
                          htmlFor={`activity-upload-${index}`}
                          variant="outline"
                          colorScheme="blue"
                          leftIcon={<TbUpload />}
                          cursor="pointer"
                          isLoading={uploadingIndex === index}
                        >
                          {activity.imageUrl ? "Alterar Capa" : "Fazer Upload"}
                        </Button>
                      </Box>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Data de Realização</FormLabel>
                    <Input
                      defaultValue={activity.date}
                      onChange={(e) => handleActivityChange(e, index, "date")}
                      placeholder="YYYY-MM-DD"
                      type="date"
                    />
                  </FormControl>

                  {renderCamposEspecificos(activity, index)}

                  <FormControl display="flex" alignItems="center" pt={3}>
                    <FormLabel mb="0" fontWeight="semibold">
                      Exibir na Página Inicial
                    </FormLabel>
                    <Switch
                      isChecked={activity.showOnHomepage}
                      onChange={() => handleSwitchChange(index)}
                    />
                  </FormControl>

                  <DeleteButton onDelete={() => handleDeleteActivity(index)} />
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Stack direction="row" spacing={4} justifyContent="flex-end" py={4}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleAddActivity}
          isDisabled={activitiesLoading}
        >
          Adicionar Atividade
        </Button>
        <Button
          colorScheme="blue"
          rightIcon={<BiSave />}
          isDisabled={
            !hasChanged || activitiesLoading || uploadingIndex !== null
          }
          onClick={handleSave}
          isLoading={activitiesLoading}
        >
          Salvar Alterações
        </Button>
      </Stack>
    </Box>
  );
};

export default EventsActivities;
