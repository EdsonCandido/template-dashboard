import { Flex, Spinner, Text } from "@chakra-ui/react";

type Input = {
    textDescription?: string;
}
const Loading = ({ textDescription = 'Carregando...' }: Input) => {

    return (
        <Flex w={"100%"} h={"100%"} gap={2} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Spinner thickness='5px' speed='0.65s' emptyColor='gray.200' color='#030067' size='xl' />
            <Text size="xl">{textDescription}</Text>
        </Flex>
    );
}

export default Loading