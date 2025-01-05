import { Flex, Text } from "@chakra-ui/react"
import { Spinner } from '@chakra-ui/react'
const LoadingPage = () => {
    return (
        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='#030067' size='xl' />
            <Text fontWeight="bold" size="2xl">Carregando...</Text>

        </Flex>
    )
}

export default LoadingPage