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
  Table,
  Textarea,
  Tooltip,
  Flex,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { TbPlus, TbUpload } from "react-icons/tb";
import {
  usePrimaryPageVideosStore,
  useSocialMediaPostsStore,
  useTestimonialsStore,
} from "app/states";
import { HeadingText } from "components";
import SocialMediaPost from "types/data/socialMediaPost";
import Testimonial from "types/data/testimonial";
import Video from "types/data/video";
import DeleteButton from "./DeleteButton";

const PaginaInicial = () => {
  // --- STATES ---
  const [videos, setVideos] = useState<Video[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [socialMediaPosts, setSocialMediaPosts] = useState<SocialMediaPost[]>([]);
  
  const [hasVideoChanged, setHasVideoChanged] = useState(false);
  const [hasTestimonialChanged, setHasTestimonialChanged] = useState(false);
  const [hasSocialMediaPostsChanged, setHasSocialMediaPostsChanged] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  // --- STORES ---
  const getTestimonials = useTestimonialsStore((state) => state.getTestimonials);
const updateTestimonials = useTestimonialsStore((state) => state.updateTestimonials);
const testimonial_loading = useTestimonialsStore((state) => state.testimonial_loading);

// --- STORES VÍDEOS ---
const getPrimaryPageVideos = usePrimaryPageVideosStore((state) => state.getPrimaryPageVideos);
const updatePrimaryPageVideos = usePrimaryPageVideosStore((state) => state.updatePrimaryPageVideos);
const primaryPageVideosLoading = usePrimaryPageVideosStore((state) => state.primaryPageVideosLoading);

// --- STORES POSTS ---
const getSocialMediaPosts = useSocialMediaPostsStore((state) => state.getSocialMediaPosts);
const updateSocialMediaPosts = useSocialMediaPostsStore((state) => state.updateSocialMediaPosts);
const socialMediaPostsLoading = useSocialMediaPostsStore((state) => state.socialMediaPostsLoading);

  // --- EFFECTS ---
  useEffect(() => {
    getTestimonials().then((data) => setTestimonials(data));
  }, [getTestimonials]);

  useEffect(() => {
    getPrimaryPageVideos().then((data) => setVideos(data));
  }, [getPrimaryPageVideos]);

  useEffect(() => {
    getSocialMediaPosts().then((data) => setSocialMediaPosts(data));
  }, [getSocialMediaPosts]);

  // --- HANDLERS VÍDEOS ---
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>, index: number, type: keyof Video) => {
    setVideos((prev) => prev.map((video, i) => (i === index ? { ...video, [type]: e.target.value } : video)));
    setHasVideoChanged(true);
  };

  const handleVideoDelete = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
    setHasVideoChanged(true);
  };

  const handleVideoAdd = () => {
    setVideos([...videos, { title: "Sem título", videoUrl: "" }]);
    setHasVideoChanged(true);
  };

  const handleVideoSave = () => {
    updatePrimaryPageVideos(videos).then(() => {
      alert("Vídeos salvos com sucesso!");
      setHasVideoChanged(false);
    });
  };

  // --- HANDLERS TESTEMUNHOS ---
  const handleTestimonialChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, type: keyof Testimonial) => {
    setTestimonials((prev) => prev.map((t, i) => (i === index ? { ...t, [type]: e.target.value } : t)));
    setHasTestimonialChanged(true);
  };

  const handleTestimonialDelete = (index: number) => {
    setTestimonials((prev) => prev.filter((_, i) => i !== index));
    setHasTestimonialChanged(true);
  };

  const handleTestimonialAdd = () => {
    setTestimonials([...testimonials, { name: "Sem nome", sublegend: "", sublegendHref: "#", color: "pink", avatar: "", testimonial: "" }]);
    setHasTestimonialChanged(true);
  };

  const handleTestimonialSave = () => {
    updateTestimonials(testimonials).then(() => {
      alert("Testemunhos salvos com sucesso!");
      setHasTestimonialChanged(false);
    });
  };

  // --- HANDLERS REDES SOCIAIS & UPLOAD ---
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIndex(index);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Falha no upload");

      const data = await response.json();
      setSocialMediaPosts((prev) =>
        prev.map((post, i) => (i === index ? { ...post, imageUrl: data.url } : post))
      );
      setHasSocialMediaPostsChanged(true);
    } catch (error) {
      alert("Erro ao fazer upload da imagem.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSocialMediaPostsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: any } },
    index: number,
    type: keyof SocialMediaPost
  ) => {
    setSocialMediaPosts((prev) =>
      prev.map((post, i) => (i === index ? { ...post, [type]: e.target.value } : post))
    );
    setHasSocialMediaPostsChanged(true);
  };

  const handleSocialMediaPostsDelete = (index: number) => {
    setSocialMediaPosts((prev) => prev.filter((_, i) => i !== index));
    setHasSocialMediaPostsChanged(true);
  };

  const handleSocialMediaPostsAdd = () => {
    const newPost: SocialMediaPost = {
      name: "",
      text: "Sem texto",
      imageUrl: "",
      href: "",
      socialMedia: "Instagram",
      date: new Date().toLocaleDateString("pt-BR"),
      showInTimeline: false,
      subname: "",
    };
    setSocialMediaPosts([...socialMediaPosts, newPost]);
    setHasSocialMediaPostsChanged(true);
  };

  const handleSocialMediaPostsSave = () => {
    console.log("Dados que serão enviados ao banco:", socialMediaPosts);
    updateSocialMediaPosts(socialMediaPosts).then(() => {
      alert("Posts de redes sociais salvos com sucesso!");
      setHasSocialMediaPostsChanged(false);
    });
  };

  return (
    <Box px={4} display="flex" flexDirection="column" gap={8} pb={10}>
      {/* SEÇÃO VÍDEOS */}
      <Box>
        <HeadingText align="left" text="Vídeos" />
        {primaryPageVideosLoading ? (
          <Spinner mx="auto" display="block" />
        ) : (
          <Table variant="simple">
            <thead>
              <tr>
                <th>Título</th>
                <th>
                  <Tooltip label="Copie o EMBED do vídeo do YouTube e cole aqui" placement="top">
                    <Link href="https://ajuda.glassdoor.com.br/s/article/Como-encontrar-o-codigo-de-incorporacao-no-Youtube?language=pt_BR" target="_blank" className="cursor-pointer hover:text-blue-500 hover:underline">
                      Embed do Vídeo
                    </Link>
                  </Tooltip>
                </th>
                <th className="w-16">Deletar</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Input value={item.title} onChange={(e) => handleVideoChange(e, index, "title")} variant="filled" />
                  </td>
                  <td>
                    <Input value={item.videoUrl} onChange={(e) => handleVideoChange(e, index, "videoUrl")} variant="filled" />
                  </td>
                  <td className="flex justify-center">
                    <DeleteButton onDelete={() => handleVideoDelete(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Stack direction="row" spacing={4} mt={4}>
          <Button variant="outline" leftIcon={<TbPlus />} onClick={handleVideoAdd}>Adicionar Vídeo</Button>
          <Button colorScheme="blue" rightIcon={<BiSave />} onClick={handleVideoSave} isDisabled={!hasVideoChanged}>Salvar Vídeos</Button>
        </Stack>
      </Box>

      {/* SEÇÃO TESTEMUNHOS */}
      <Box>
        <HeadingText align="left" text="Testemunhos" />
        {testimonial_loading ? (
          <Spinner mx="auto" display="block" />
        ) : (
          <Accordion border="1px solid" borderColor="red.400" borderRadius="md" allowToggle>
            {testimonials.map((item, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton><Box flex="1" textAlign="left">{item.name}</Box><AccordionIcon /></AccordionButton>
                </h2>
                <AccordionPanel pb={4} display="flex" flexDirection="column" gap={4}>
                  <FormControl><FormLabel>Nome</FormLabel><Input value={item.name} onChange={(e) => handleTestimonialChange(e, index, "name")} variant="filled" /></FormControl>
                  <FormControl><FormLabel>Subtítulo</FormLabel><Input value={item.sublegend} onChange={(e) => handleTestimonialChange(e, index, "sublegend")} variant="filled" /></FormControl>
                  <FormControl><FormLabel>Link Subtítulo</FormLabel><Input value={item.sublegendHref} onChange={(e) => handleTestimonialChange(e, index, "sublegendHref")} variant="filled" /></FormControl>
                  <FormControl><FormLabel>Cor</FormLabel><Input value={item.color} onChange={(e) => handleTestimonialChange(e, index, "color")} variant="filled" /></FormControl>
                  <FormControl><FormLabel>Avatar (URL)</FormLabel><Input value={item.avatar || ""} onChange={(e) => handleTestimonialChange(e, index, "avatar")} variant="filled" /></FormControl>
                  <FormControl><FormLabel>Testemunho</FormLabel><Textarea value={item.testimonial} onChange={(e) => handleTestimonialChange(e, index, "testimonial")} variant="filled" rows={4} /></FormControl>
                  <DeleteButton onDelete={() => handleTestimonialDelete(index)} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        <Stack direction="row" spacing={4} mt={4}>
          <Button variant="outline" leftIcon={<TbPlus />} onClick={handleTestimonialAdd}>Adicionar Testemunho</Button>
          <Button colorScheme="blue" rightIcon={<BiSave />} onClick={handleTestimonialSave} isDisabled={!hasTestimonialChanged} isLoading={testimonial_loading}>Salvar Testemunhos</Button>
        </Stack>
      </Box>

      {/* SEÇÃO REDES SOCIAIS (COM UPLOAD) */}
      <Box>
        <HeadingText align="left" text="Posts de Redes Sociais" />
        {socialMediaPostsLoading ? (
          <Spinner mx="auto" display="block" />
        ) : (
          <Accordion border="1px solid" borderColor="red.400" borderRadius="md" allowToggle>
            {socialMediaPosts.map((item, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                      <strong>{item.socialMedia}</strong> | {item.text}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} display="flex" flexDirection="column" gap={4}>
                  <FormControl><FormLabel>Nome da conta</FormLabel><Input value={item.name} onChange={(e) => handleSocialMediaPostsChange(e, index, "name")} variant="filled" /></FormControl>
                  <FormControl><FormLabel>Subtítulo</FormLabel><Input value={item.subname} onChange={(e) => handleSocialMediaPostsChange(e, index, "subname")} variant="filled" /></FormControl>
                  
                  {/* UPLOAD DE IMAGEM REDE SOCIAL */}
                  <FormControl>
                    <FormLabel>Imagem do Post</FormLabel>
                    <Flex gap={4} alignItems="center">
                      <Box flexShrink={0}>
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt="Preview" boxSize="80px" objectFit="cover" borderRadius="md" fallback={<Box boxSize="80px" bg="gray.200" borderRadius="md" />} />
                        ) : (
                          <Box boxSize="80px" bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center"><TbUpload size={24} color="gray" /></Box>
                        )}
                      </Box>
                      <Box flex={1}>
                        <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, index)} display="none" id={`post-upload-${index}`} />
                        <Button as="label" htmlFor={`post-upload-${index}`} variant="outline" colorScheme="blue" leftIcon={<TbUpload />} cursor="pointer" isLoading={uploadingIndex === index} width="full">
                          {item.imageUrl ? "Alterar Foto" : "Fazer Upload"}
                        </Button>
                        <Input mt={2} size="xs" value={item.imageUrl} placeholder="URL da imagem" onChange={(e) => handleSocialMediaPostsChange(e, index, "imageUrl")} />
                      </Box>
                    </Flex>
                  </FormControl>

                  <FormControl><FormLabel>Link</FormLabel><Input value={item.href} onChange={(e) => handleSocialMediaPostsChange(e, index, "href")} variant="filled" /></FormControl>
                  <FormControl><FormLabel>Rede Social</FormLabel><Input value={item.socialMedia} onChange={(e) => handleSocialMediaPostsChange(e, index, "socialMedia")} variant="filled" /></FormControl>
                  <FormControl><FormLabel>Data</FormLabel><Input value={item.date} onChange={(e) => handleSocialMediaPostsChange(e, index, "date")} variant="filled" /></FormControl>
                  <FormControl><FormLabel>Texto</FormLabel><Textarea value={item.text} onChange={(e) => handleSocialMediaPostsChange(e, index, "text")} variant="filled" rows={4} /></FormControl>
                  
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Mostrar na Timeline</FormLabel>
                    <Switch isChecked={item.showInTimeline} onChange={(e) => handleSocialMediaPostsChange({ target: { value: e.target.checked } } as any, index, "showInTimeline")} />
                  </FormControl>
                  <DeleteButton onDelete={() => handleSocialMediaPostsDelete(index)} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        <Stack direction="row" spacing={4} mt={4}>
          <Button variant="outline" leftIcon={<TbPlus />} onClick={handleSocialMediaPostsAdd}>Adicionar Post</Button>
          <Button colorScheme="blue" rightIcon={<BiSave />} onClick={handleSocialMediaPostsSave} isDisabled={!hasSocialMediaPostsChanged || uploadingIndex !== null} isLoading={socialMediaPostsLoading}>Salvar Posts</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default PaginaInicial;