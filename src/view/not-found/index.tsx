import { Button, Flex, Text } from "@chakra-ui/react";

import Error403 from '../../assets/403.svg'

const NotFound = () => {
    return (
        <>
            <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>

                <Flex w={'40%'} h={'40%'}>
                    <img src={Error403} alt="Error 403" />
                </Flex>

                <Text size="2xl">Página não encontrada</Text>
                <Text size="2xl">A página pode ter sido movida ou modificada</Text>

                <Flex gap={4} mt={4} justify={'space-between'} w={'20%'}>
                    <Button onClick={() => window.location.reload()} colorScheme="blue">Recarregar</Button>
                    <Button onClick={() => window.history.back()} colorScheme="teal">Voltar</Button>
                </Flex>

            </Flex>
        </>
    );
}

export default NotFound;