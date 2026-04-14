"use client";
import {
  Button,
  chakra,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // Mudança importante aqui!
import { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from "react-icons/fa";
import useAuthStore from "./authStore";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const FormLogin = () => {
  const router = useRouter(); // Instanciando o router
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={4}
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
        borderRadius="md"
      >
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <CFaUserAlt color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChangeEmail}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.300">
              <CFaLock color="gray.300" />
            </InputLeftElement>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={handleChangePassword}
            />
            <InputRightElement>
              <Button
                size="sm"
                onClick={handleShowClick}
                h="1.75rem"
                variant="unstyled"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          borderRadius={4}
          type="submit"
          variant="solid"
          colorScheme="teal"
          width="full"
        >
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default FormLogin;
