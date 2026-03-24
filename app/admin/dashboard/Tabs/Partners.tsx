"use client";
import {
  Box,
  Button,
  Input,
  Spinner,
  Stack,
  Switch,
  Tr,
  Td,
  Flex,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { TbPlus } from "react-icons/tb";
import { usePartnersStore } from "app/states";
import { HeadingText, DraggableList } from "components";
import Partner from "types/data/partner";
import DeleteButton from "./DeleteButton";

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [hasChanged, setHasChanged] = useState(false);
  const { getPartners, updatePartners, partnersLoading } = usePartnersStore(
    (state) => ({
      getPartners: state.getPartners,
      updatePartners: state.updatePartners,
      partnersLoading: state.partnersLoading,
    })
  );

  useEffect(() => {
    getPartners().then((data) => {
      // Ensure each partner has an id (use index as fallback)
      const partnersWithIds = data.map((p, idx) => ({
        ...p,
        id: p.id || `temp-${idx}`,
      }));
      setPartners(partnersWithIds);
    });
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    index: number,
    field: keyof Partner
  ) => {
    try {
      if (index < 0 || index >= partners.length || !partners[index]) return;
      setPartners((prev) =>
        prev.map((partner, i) =>
          i === index ? { ...partner, [field]: e.target.value } : partner
        )
      );
      setHasChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPartner = () => {
    const newPartner: Partner = {
      id: `temp-${Date.now()}`,
      name: "Novo Parceiro",
      imageUrl: "#",
      href: "#",
      active: false,
    };
    setPartners([...partners, newPartner]);
    setHasChanged(true);
  };

  const handleDeletePartner = (index: number) => {
    const updatedPartners = [...partners];
    updatedPartners.splice(index, 1);
    setPartners(updatedPartners);
    setHasChanged(true);
  };

  const handleSwitchChange = (index: number) => {
    try {
      if (index < 0 || index >= partners.length || !partners[index]) return;
      setPartners((prev) =>
        prev.map((partner, i) =>
          i === index
            ? { ...partner, active: partner.active ? false : true }
            : partner
        )
      );
      setHasChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSavePartners = async () => {
    partners.forEach((item) => {
      if (!item.name) {
        alert("Nome do parceiro não pode ser vazio!");
        return;
      }
      if (!item.href) {
        alert("URL do parceiro não pode ser vazio!");
        return;
      }
    });
    await updatePartners(partners).then(() => {
      alert("Parceiros salvos com sucesso!");
    });
    setHasChanged(false);
  };

  const handleReorder = (reorderedPartners: Partner[]) => {
    setPartners(reorderedPartners);
    setHasChanged(true);
  };

  return (
    <Box px={4} display="flex" flexDirection="column" gap={4}>
      <HeadingText align="left" text="Todos os Parceiros" />
      {partnersLoading ? (
        <Spinner />
      ) : (
        <Box overflowX="auto">
          <DraggableList
            items={partners}
            onReorder={handleReorder}
            isLoading={partnersLoading}
            renderItem={(partner, index) => (
              <Flex width="100%" gap={2} alignItems="center">
                <Box width="20%" minW="100px">
                  <Input
                    placeholder="Nome do parceiro"
                    mb={0}
                    defaultValue={partner.name}
                    onChange={(e) => handleInputChange(e, index, "name")}
                    size="sm"
                  />
                </Box>
                <Box width="30%" minW="150px">
                  <Input
                    placeholder="Link de redirecionamento"
                    mb={0}
                    defaultValue={partner.href || ""}
                    onChange={(e) => handleInputChange(e, index, "href")}
                    size="sm"
                  />
                </Box>
                <Box width="30%" minW="150px">
                  <Input
                    placeholder="URL da imagem"
                    mb={0}
                    defaultValue={partner.imageUrl}
                    onChange={(e) => handleInputChange(e, index, "imageUrl")}
                    size="sm"
                  />
                </Box>
                <Box width="10%" minW="80px" display="flex" justifyContent="center">
                  <Switch
                    isChecked={partner.active}
                    onChange={() => handleSwitchChange(index)}
                  />
                </Box>
                <Box width="10%" minW="80px">
                  <DeleteButton
                    onDelete={() => handleDeletePartner(index)}
                  />
                </Box>
              </Flex>
            )}
          />
        </Box>
      )}
      <Stack direction="row" spacing={4}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleAddPartner}
          isDisabled={partnersLoading}
        >
          Adicionar Parceiro
        </Button>
        <Button
          colorScheme="blue"
          rightIcon={<BiSave />}
          onClick={handleSavePartners}
          isDisabled={!hasChanged || partnersLoading}
          isLoading={partnersLoading}
        >
          Salvar Parceiros
        </Button>
      </Stack>
    </Box>
  );
};

export default Partners;
