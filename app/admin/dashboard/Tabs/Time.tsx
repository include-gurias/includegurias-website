"use client";
import {
  Box,
  Button,
  Input,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { TbPlus, TbUpload } from "react-icons/tb";
import {
  useOldMembersStore,
  useScholarshipMembersStore,
  useTeamMembersStore,
} from "app/states";
import { HeadingText } from "components";
import { OldMember, ScholarshipMember, TeamMember } from "types/data/team";
import DeleteButton from "./DeleteButton";

const Time = () => {
  // --- ESTADOS DE EQUIPE ---
  const [time, setTime] = useState<TeamMember[]>([]);
  const [teamHasChanged, setTeamHasChanged] = useState(false);
  const [uploadingTeamIndex, setUploadingTeamIndex] = useState<number | null>(
    null
  );

  const { getTeamMembers, updateTeamMembers, teamMembersLoading } =
    useTeamMembersStore((state) => ({
      getTeamMembers: state.getTeamMembers,
      updateTeamMembers: state.updateTeamMembers,
      teamMembersLoading: state.teamMembersLoading,
    }));

  useEffect(() => {
    getTeamMembers().then((data) => setTime(data));
  }, [getTeamMembers]);

  const handleTeamFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingTeamIndex(index);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload falhou");
      const data = await res.json();
      setTime((prev) =>
        prev.map((m, i) => (i === index ? { ...m, imageUrl: data.url } : m))
      );
      setTeamHasChanged(true);
    } catch (error) {
      alert("Erro no upload");
    } finally {
      setUploadingTeamIndex(null);
    }
  };

  const handleTeamChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    index: number,
    field: keyof TeamMember
  ) => {
    try {
      if (index < 0 || index >= time.length || !time[index]) return;
      setTime((prev) =>
        prev.map((member, i) =>
          i === index ? { ...member, [field]: e.target.value } : member
        )
      );
      setTeamHasChanged(true);
    } catch (error) {
      alert("Erro ao alterar membro da equipe");
    }
  };

  const handleTeamAdd = () => {
    const newTeamMember: TeamMember = {
      name: "Novo Membro",
      job: "",
      imageUrl: "",
      href: "",
    };
    setTime([...time, newTeamMember]);
  };

  const handleTeamDelete = (index: number) => {
    setTeamHasChanged(true);
    const updatedTeam = [...time];
    updatedTeam.splice(index, 1);
    setTime(updatedTeam);
  };

  const handleTeamSave = () => {
    updateTeamMembers(time).then(() =>
      alert("Membros da equipe salvos com sucesso!")
    );
    setTeamHasChanged(false);
  };

  // --- ESTADOS DE BOLSISTAS ---
  const [bolsistas, setBolsistas] = useState<ScholarshipMember[]>([]);
  const [bolsistasHasChanged, setBolsistasHasChanged] = useState(false);
  const [uploadingBolsistaIndex, setUploadingBolsistaIndex] = useState<
    number | null
  >(null);

  const {
    getScholarshipMembers,
    updateScholarshipMembers,
    scholarshipMembersLoading,
  } = useScholarshipMembersStore((state) => ({
    getScholarshipMembers: state.getScholarshipMembers,
    updateScholarshipMembers: state.updateScholarshipMembers,
    scholarshipMembersLoading: state.scholarshipMembersLoading,
  }));

  useEffect(() => {
    getScholarshipMembers().then((data) => setBolsistas(data));
  }, [getScholarshipMembers]);

  const handleBolsistaFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingBolsistaIndex(index);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload falhou");
      const data = await res.json();
      setBolsistas((prev) =>
        prev.map((m, i) => (i === index ? { ...m, imageUrl: data.url } : m))
      );
      setBolsistasHasChanged(true);
    } catch (error) {
      alert("Erro no upload");
    } finally {
      setUploadingBolsistaIndex(null);
    }
  };

  const handleBolsistaChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    index: number,
    field: keyof ScholarshipMember
  ) => {
    try {
      if (index < 0 || index >= bolsistas.length || !bolsistas[index]) return;
      setBolsistas((prev) =>
        prev.map((bolsista, i) =>
          i === index ? { ...bolsista, [field]: e.target.value } : bolsista
        )
      );
      setBolsistasHasChanged(true);
    } catch (error) {
      alert("Erro ao alterar bolsista");
    }
  };

  const handleBolsistaAdd = () => {
    setBolsistas([...bolsistas, { name: "Novo Bolsista", imageUrl: "" }]);
  };

  const handleBolsistaDelete = (index: number) => {
    setBolsistasHasChanged(true);
    const updatedBolsistas = [...bolsistas];
    updatedBolsistas.splice(index, 1);
    setBolsistas(updatedBolsistas);
  };

  const handleBolsistaSave = () => {
    updateScholarshipMembers(bolsistas).then(() =>
      alert("Bolsistas salvos com sucesso!")
    );
    setBolsistasHasChanged(false);
  };

  // --- ESTADOS DE ANTIGOS MEMBROS ---
  const [allMembers, setAllMembers] = useState<OldMember[]>([]);
  const [oldMembersHasChanged, setOldMembersHasChanged] = useState(false);
  const [uploadingOldMemberIndex, setUploadingOldMemberIndex] = useState<
    number | null
  >(null);

  const { getOldMembers, updateOldMembers, oldMembersLoading } =
    useOldMembersStore((state) => ({
      getOldMembers: state.getOldMembers,
      updateOldMembers: state.updateOldMembers,
      oldMembersLoading: state.oldMembersLoading,
    }));

  useEffect(() => {
    getOldMembers().then((data) => setAllMembers(data));
  }, [getOldMembers]);

  const handleOldMemberFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingOldMemberIndex(index);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload falhou");
      const data = await res.json();
      setAllMembers((prev) =>
        prev.map((m, i) => (i === index ? { ...m, imageUrl: data.url } : m))
      );
      setOldMembersHasChanged(true);
    } catch (error) {
      alert("Erro no upload");
    } finally {
      setUploadingOldMemberIndex(null);
    }
  };

  const handleOldMemberChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    index: number,
    field: keyof OldMember
  ) => {
    try {
      if (index < 0 || index >= allMembers.length || !allMembers[index]) return;
      setAllMembers((prev) =>
        prev.map((member, i) =>
          i === index ? { ...member, [field]: e.target.value } : member
        )
      );
      setOldMembersHasChanged(true);
    } catch (error) {
      alert("Erro ao alterar membro");
    }
  };

  const handleOldMemberAdd = () => {
    setOldMembersHasChanged(true);
    setAllMembers([
      ...allMembers,
      { name: "Novo Membro", imageUrl: "", job: "" },
    ]);
  };

  const handleOldMemberDelete = (index: number) => {
    setOldMembersHasChanged(true);
    const updatedMembers = [...allMembers];
    updatedMembers.splice(index, 1);
    setAllMembers(updatedMembers);
  };

  const handleOldMemberSave = () => {
    updateOldMembers(allMembers).then(() =>
      alert("Membros salvos com sucesso!")
    );
    setOldMembersHasChanged(false);
  };

  return (
    <Box px={4} display="flex" flexDirection="column" gap={8} pb={8}>
      {/* --- SEÇÃO TIME PRINCIPAL --- */}
      <Box display="flex" flexDirection="column" gap={4}>
        <HeadingText align="left" text="Equipe" />
        {teamMembersLoading ? (
          <Spinner />
        ) : (
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Cargo</Th>
                <Th>Imagem</Th>
                <Th>Link</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {time.map((member, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      defaultValue={member.name}
                      onChange={(e) => handleTeamChange(e, index, "name")}
                    />
                  </Td>
                  <Td>
                    <Input
                      defaultValue={member.job || ""}
                      onChange={(e) => handleTeamChange(e, index, "job")}
                    />
                  </Td>
                  <Td>
                    <Flex align="center" gap={2}>
                      {member.imageUrl ? (
                        <Image
                          src={member.imageUrl}
                          alt="imagem membro"
                          boxSize="36px"
                          borderRadius="full"
                          objectFit="cover"
                        />
                      ) : (
                        <Box boxSize="36px" bg="gray.200" borderRadius="full" />
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        display="none"
                        id={`team-upload-${index}`}
                        onChange={(e) => handleTeamFileChange(e, index)}
                      />
                      <Button
                        as="label"
                        htmlFor={`team-upload-${index}`}
                        size="xs"
                        colorScheme="blue"
                        variant="outline"
                        cursor="pointer"
                        isLoading={uploadingTeamIndex === index}
                      >
                        Upload
                      </Button>
                    </Flex>
                  </Td>
                  <Td>
                    <Input
                      defaultValue={member.href || ""}
                      onChange={(e) => handleTeamChange(e, index, "href")}
                    />
                  </Td>
                  <Td>
                    <DeleteButton onDelete={() => handleTeamDelete(index)} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        <Stack direction="row" spacing={4}>
          <Button
            variant={"outline"}
            leftIcon={<TbPlus />}
            onClick={handleTeamAdd}
            isDisabled={teamMembersLoading}
          >
            Adicionar Membro
          </Button>
          <Button
            colorScheme="blue"
            rightIcon={<BiSave />}
            onClick={handleTeamSave}
            isDisabled={
              !teamHasChanged ||
              teamMembersLoading ||
              uploadingTeamIndex !== null
            }
            isLoading={teamMembersLoading}
          >
            Salvar Membros
          </Button>
        </Stack>
      </Box>

      {/* --- SEÇÃO BOLSISTAS --- */}
      <Box display="flex" flexDirection="column" gap={4}>
        <HeadingText align="left" text="Bolsistas" />
        {scholarshipMembersLoading ? (
          <Spinner />
        ) : (
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Imagem</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bolsistas.map((bolsista, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      defaultValue={bolsista.name}
                      onChange={(e) => handleBolsistaChange(e, index, "name")}
                    />
                  </Td>
                  <Td>
                    <Flex align="center" gap={2}>
                      {bolsista.imageUrl ? (
                        <Image
                          src={bolsista.imageUrl}
                          alt="imagem membro"
                          boxSize="36px"
                          borderRadius="full"
                          objectFit="cover"
                        />
                      ) : (
                        <Box boxSize="36px" bg="gray.200" borderRadius="full" />
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        display="none"
                        id={`bolsista-upload-${index}`}
                        onChange={(e) => handleBolsistaFileChange(e, index)}
                      />
                      <Button
                        as="label"
                        htmlFor={`bolsista-upload-${index}`}
                        size="xs"
                        colorScheme="blue"
                        variant="outline"
                        cursor="pointer"
                        isLoading={uploadingBolsistaIndex === index}
                      >
                        Upload
                      </Button>
                    </Flex>
                  </Td>
                  <Td>
                    <DeleteButton
                      onDelete={() => handleBolsistaDelete(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        <Stack direction="row" spacing={4}>
          <Button
            variant={"outline"}
            leftIcon={<TbPlus />}
            onClick={handleBolsistaAdd}
            isDisabled={scholarshipMembersLoading}
          >
            Adicionar Bolsista
          </Button>
          <Button
            colorScheme="blue"
            rightIcon={<BiSave />}
            onClick={handleBolsistaSave}
            isDisabled={
              !bolsistasHasChanged ||
              scholarshipMembersLoading ||
              uploadingBolsistaIndex !== null
            }
            isLoading={scholarshipMembersLoading}
          >
            Salvar Bolsistas
          </Button>
        </Stack>
      </Box>

      {/* --- SEÇÃO TODOS OS MEMBROS (ANTIGOS) --- */}
      <Box display="flex" flexDirection="column" gap={4}>
        <HeadingText align="left" text="Todos os Membros" />
        {oldMembersLoading ? (
          <Spinner />
        ) : (
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Cargo</Th>
                <Th>Imagem</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allMembers.map((member, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      defaultValue={member.name}
                      onChange={(e) => handleOldMemberChange(e, index, "name")}
                    />
                  </Td>
                  <Td>
                    <Input
                      defaultValue={member.job || ""}
                      onChange={(e) => handleOldMemberChange(e, index, "job")}
                    />
                  </Td>
                  <Td>
                    <Flex align="center" gap={2}>
                      {member.imageUrl ? (
                        <Image
                          src={member.imageUrl}
                          alt="imagem membro"
                          boxSize="36px"
                          borderRadius="full"
                          objectFit="cover"
                        />
                      ) : (
                        <Box boxSize="36px" bg="gray.200" borderRadius="full" />
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        display="none"
                        id={`old-upload-${index}`}
                        onChange={(e) => handleOldMemberFileChange(e, index)}
                      />
                      <Button
                        as="label"
                        htmlFor={`old-upload-${index}`}
                        size="xs"
                        colorScheme="blue"
                        variant="outline"
                        cursor="pointer"
                        isLoading={uploadingOldMemberIndex === index}
                      >
                        Upload
                      </Button>
                    </Flex>
                  </Td>
                  <Td>
                    <DeleteButton
                      onDelete={() => handleOldMemberDelete(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        <Stack direction="row" spacing={4}>
          <Button
            variant={"outline"}
            leftIcon={<TbPlus />}
            onClick={handleOldMemberAdd}
            isDisabled={oldMembersLoading}
          >
            Adicionar Membro
          </Button>
          <Button
            colorScheme="blue"
            rightIcon={<BiSave />}
            onClick={handleOldMemberSave}
            isDisabled={
              oldMembersLoading ||
              !oldMembersHasChanged ||
              uploadingOldMemberIndex !== null
            }
            isLoading={oldMembersLoading}
          >
            Salvar Membros
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Time;
