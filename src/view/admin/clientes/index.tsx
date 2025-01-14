import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading";
import TabelaClientes from "../../../components/admin/Clientes/TabelaClientes";

const Clientes = () => {
  const router = useNavigate();

  const [isLoadingPage, setIsloadingPage] = useState(false);
  const [dataRequest, setDataRequest] = useState<null | []>(null);

  const onOpenModal = (cod?: number) => {
    console.log("cod", cod);
  };

  const onInit = async () => {
    setIsloadingPage(true);

    setTimeout(() => {
      setIsloadingPage(false);
    }, 2500);
  };

  useEffect(() => {
    void onInit();
  }, []);

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      gap={"10px"}
    >
      <Flex>
        <Text
          cursor={"pointer"}
          onClick={() => router(-1)}
          _hover={{
            textDecoration: "underline",
            color: "blue",
          }}
        >
          Configurações / Admin / Clientes
        </Text>
      </Flex>
      <Stack
        w={"100%"}
        bg={"white"}
        borderRadius={"5px"}
        p={"10px"}
        gap={"10px"}
        boxShadow={"lg"}
      >
        <Flex w={"100%"} justify={"space-between"}>
          <Flex w={"100%"} justify={"flex-end"}>
            <Button
              onClick={() => onOpenModal()}
              isDisabled={isLoadingPage}
              isLoading={isLoadingPage}
              colorScheme="green"
              size={"sm"}
              leftIcon={<FaPlus />}
            >
              Novo
            </Button>
          </Flex>
        </Flex>
      </Stack>

      <Stack
        w={"100%"}
        bg={"white"}
        borderRadius={"5px"}
        p={"10px"}
        gap={"10px"}
        boxShadow={"lg"}
      >
        {isLoadingPage ? (
          <Loading />
        ) : (
          <TabelaClientes dataRequest={dataRequest} openModal={onOpenModal} />
        )}
      </Stack>
    </Flex>
  );
};

export default Clientes;
