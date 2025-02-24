import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  // Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/auth";

// import Logo from '../../assets/logo/AABB-azul.svg'

const Login = () => {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [loginTxt, setLoginTxt] = useState("");
  const [passwordTxt, setPasswordTxt] = useState("");

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onPressSubmit = async () => {
    setIsLoadingSubmit(true);
    if (!loginTxt || !passwordTxt) {
      toast.error("Login ou senha inválidos!");
      setIsLoadingSubmit(false);

      return;
    }

    const result = await signIn({ login: loginTxt, password: passwordTxt });
    if (result.success) {
      toast.dismiss();
      setIsLoadingSubmit(false);

      if (result.data?.usuario?.is_admin !== 1) {
        toast.error("Acesso negado!");
      } else {
        navigate("/admin/settings");
      }

      return;
    } else {
      toast.error(result.message);
      setIsLoadingSubmit(false);
    }
  };

  const onKeyPress = (e: { keyCode: number }) => {
    if (e.keyCode === 13) onPressSubmit();
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"flex-end"}
      p={8}
      bg={useColorModeValue("gray.500", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading
          style={{ textAlign: "center" }}
          lineHeight={1.1}
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          <Flex w={"100%"} justify={"center"} align={"center"}>
            {/* <Image src={Logo} h={150} /> */}
            <Text>HEFESTO</Text>
          </Flex>
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Login</FormLabel>
          <Input
            isDisabled={isLoadingSubmit}
            value={loginTxt}
            onChange={(e) => setLoginTxt(e.target.value)}
            type="text"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            isDisabled={isLoadingSubmit}
            type="password"
            value={passwordTxt}
            onKeyUp={onKeyPress}
            onChange={(e) => setPasswordTxt(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          {/* <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'flex-end'}>
                        <Text cursor={'pointer'} _hover={{ textDecoration: 'underline' }} color={'blue.500'}>Esqueceu sua senha?</Text>
                    </Stack> */}
          <Button
            isLoading={isLoadingSubmit}
            isDisabled={isLoadingSubmit}
            onClick={onPressSubmit}
            bg={"#030067"}
            color={"white"}
            _hover={{
              bg: "blue.600",
            }}
          >
            Entrar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
