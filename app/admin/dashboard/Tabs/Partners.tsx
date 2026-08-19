"use client";

import {
  Box,
  Button,
  Input,
  Spinner,
  Stack,
  Switch,
  Flex,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState, memo } from "react";
import { BiSave } from "react-icons/bi";
import { TbPlus, TbUpload } from "react-icons/tb";
import { usePartnersStore } from "app/states";
import { HeadingText, DraggableList } from "components";
import Partner from "types/data/partner";
import DeleteButton from "./DeleteButton";

const PartnerRow = memo(({ 
  partner, 
  index, 
  onInputChange, 
  onFileChange, 
  onSwitchChange, 
  onDelete,
  isUploading,
  isLoading 
}: {
  partner: Partner;
  index: number;
  onInputChange: (e: ChangeEvent<HTMLInputElement>, index: number, field: keyof Partner) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  onSwitchChange: (index: number) => void;
  onDelete: (index: number) => void;
  isUploading: boolean;
  isLoading: boolean;
}) => {
  return (
    <Flex
      width="100%"
      gap={4}
      alignItems="center"
      py={2}
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Box width="60px" flexShrink={0} textAlign="center">
        {partner.imageUrl && partner.imageUrl !== "#" ? (
          <Image
            src={partner.imageUrl}
            alt={partner.name}
            boxSize="40px"
            objectFit="contain"
            borderRadius="md"
            fallback={<Spinner size="xs" />}
          />
        ) : (
          <Box boxSize="40px" bg="gray.100" borderRadius="md" />
        )}
      </Box>

      {/* Nome */}
      <Box flex={2}>
        <Input
          placeholder="Nome do parceiro"
          value={partner.name}
          onChange={(e) => onInputChange(e, index, "name")}
          size="sm"
          variant="filled"
        />
      </Box>

      {/* Link */}
      <Box flex={3}>
        <Input
          placeholder="Link (https://...)"
          value={partner.href || ""}
          onChange={(e) => onInputChange(e, index, "href")}
          size="sm"
          variant="filled"
        />
      </Box>

      {/* Upload */}
      <Box flex={2}>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e, index)}
          display="none"
          id={`file-upload-${index}`}
        />
        <Button
          as="label"
          htmlFor={`file-upload-${index}`}
          size="sm"
          variant="outline"
          colorScheme="blue"
          leftIcon={<TbUpload />}
          cursor="pointer"
          isLoading={isUploading}
          isDisabled={isLoading}
          width="full"
        >
          {partner.imageUrl && partner.imageUrl !== "#" ? "Alterar" : "Foto"}
        </Button>
      </Box>

      {/* Status Ativo */}
      <Box width="60px" display="flex" justifyContent="center">
        <Switch
          colorScheme="green"
          isChecked={partner.active}
          onChange={() => onSwitchChange(index)}
        />
      </Box>

      {/* Deletar */}
      <Box width="50px">
        <DeleteButton onDelete={() => onDelete(index)} />
      </Box>
    </Flex>
  );
});

PartnerRow.displayName = "PartnerRow";

// --- COMPONENTE PRINCIPAL ---
const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [hasChanged, setHasChanged] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  // Seletores individuais para evitar Loop Infinito e re-renders desnecessários
  const getPartners = usePartnersStore((state) => state.getPartners);
  const updatePartners = usePartnersStore((state) => state.updatePartners);
  const partnersLoading = usePartnersStore((state) => state.partnersLoading);

  useEffect(() => {
    let isMounted = true;
    getPartners().then((data) => {
      if (data && isMounted) {
        const partnersWithIds = data.map((p, idx) => ({
          ...p,
          id: p.id || `temp-${idx}-${Date.now()}`,
        }));
        setPartners(partnersWithIds);
      }
    });
    return () => { isMounted = false; };
  }, [getPartners]);

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

      setPartners((prev) =>
        prev.map((p, i) => (i === index ? { ...p, imageUrl: data.url } : p))
      );
      setHasChanged(true);
    } catch (error) {
      alert("Erro ao fazer upload.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>, 
    index: number, 
    field: keyof Partner // Certifique-se que aqui é "keyof" com "o" minúsculo
  ) => {
    const val = e.target.value;
    setPartners((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: val } : p))
    );
    setHasChanged(true);
  };

  const handleSwitchChange = (index: number) => {
    setPartners((prev) =>
      prev.map((p, i) => (i === index ? { ...p, active: !p.active } : p))
    );
    setHasChanged(true);
  };

  const handleAddPartner = () => {
    const newPartner: Partner = {
      id: `temp-${Date.now()}`,
      name: "",
      imageUrl: "#",
      href: "",
      active: true,
    };
    setPartners((prev) => [...prev, newPartner]);
    setHasChanged(true);
  };

  const handleDeletePartner = (index: number) => {
    setPartners((prev) => prev.filter((_, i) => i !== index));
    setHasChanged(true);
  };

  const handleSavePartners = async () => {
    // Validação básica
    const isValid = partners.every(p => p.name && p.href !== "" && p.imageUrl !== "#");
    if (!isValid) {
      alert("Por favor, preencha todos os campos e faça upload das imagens.");
      return;
    }

    await updatePartners(partners);
    setHasChanged(false);
    alert("Parceiros salvos com sucesso!");
  };

  const handleReorder = (reordered: Partner[]) => {
    setPartners(reordered);
    setHasChanged(true);
  };

  return (
    <Box px={4} pb={10} display="flex" flexDirection="column" gap={4}>
      <HeadingText align="left" text="Gerenciar Parceiros" />
      
      {partnersLoading && partners.length === 0 ? (
        <Spinner color="blue.500" />
      ) : (
        <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="lg" p={2}>
          <DraggableList
            items={partners}
            onReorder={handleReorder}
            isLoading={partnersLoading}
            renderItem={(partner, index) => (
              <PartnerRow
                key={partner.id} // ID único é essencial para performance
                partner={partner}
                index={index}
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
                onSwitchChange={handleSwitchChange}
                onDelete={handleDeletePartner}
                isUploading={uploadingIndex === index}
                isLoading={partnersLoading}
              />
            )}
          />
        </Box>
      )}

      <Stack direction="row" spacing={4} mt={2}>
        <Button
          variant="outline"
          leftIcon={<TbPlus />}
          onClick={handleAddPartner}
          isDisabled={partnersLoading}
          flex={1}
        >
          Adicionar Novo
        </Button>
        <Button
          colorScheme="blue"
          rightIcon={<BiSave />}
          onClick={handleSavePartners}
          isDisabled={!hasChanged || uploadingIndex !== null}
          isLoading={partnersLoading}
          flex={1}
        >
          Salvar Alterações
        </Button>
      </Stack>
    </Box>
  );
};

export default Partners;