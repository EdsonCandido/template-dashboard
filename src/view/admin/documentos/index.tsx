import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

const Documentos = () => {
    const router = useNavigate();

    const [isLoadingPage, setIsloadingPage] = useState(false);


    const onOpenModal = (cod?: number) => {
        console.log('cod', cod);
    }

    const onInit = async () => {
        setIsloadingPage(true);

        setTimeout(() => {
            setIsloadingPage(false);
        }, 2500);
    }

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
          {" "}
          Configurações / Admin / Documentos
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
          <Flex w={"100%"}></Flex>
          <Flex w={"100%"} justify={"flex-end"}>
            <Button
              onClick={() => onOpenModal()}
              isDisabled={isLoadingPage}
              isLoading={isLoadingPage}
              colorScheme="green"
              size={"sm"}
              leftIcon={<FaPlus />}
            >
              {" "}
              Novo{" "}
            </Button>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Documentos;
