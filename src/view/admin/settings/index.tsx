import { Box, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const Settings = () => {

    const router = useNavigate();
    return (
        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"flex-start"} gap={'10px'}>
            <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'}>
                <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={'10px'} p={'5px'}>
                    <Box alignContent={'center'} cursor={'pointer'} onClick={() => router('users', {
                        state: {
                            ref: '/admin/settings'
                        }
                    })} p={1} textAlign={'center'} borderColor={'gray.200'} borderWidth={'4px'} borderRadius={'5px'}>
                        <Text>Usuários</Text>
                    </Box>
                    <Box alignContent={'center'} cursor={'pointer'} onClick={() => router('banners', {
                        state: {
                            ref: '/admin/settings'
                        }
                    })} p={1} textAlign={'center'} borderColor={'gray.200'} borderWidth={'4px'} borderRadius={'5px'}>
                        <Text>Clientes</Text>
                    </Box>
                    <Box alignContent={'center'} cursor={'pointer'} onClick={() => router('documentos', {
                        state: {
                            ref: '/admin/settings'
                        }
                    })} p={1} textAlign={'center'} borderColor={'gray.200'} borderWidth={'4px'} borderRadius={'5px'}>
                        <Text>Documentos</Text>
                    </Box>
                    <Box alignContent={'center'} cursor={'pointer'} onClick={() => router('banners', {
                        state: {
                            ref: '/admin/settings'
                        }
                    })} p={1} textAlign={'center'} borderColor={'gray.200'} borderWidth={'4px'} borderRadius={'5px'}>
                        <Text>Banners</Text>
                    </Box>
                    <Box alignContent={'center'} cursor={'pointer'} onClick={() => router('services', {
                        state: {
                            ref: '/admin/settings'
                        }
                    })} p={1} textAlign={'center'} borderColor={'gray.200'} borderWidth={'4px'} borderRadius={'5px'}>
                        <Text>Serviços</Text>
                    </Box>
                </SimpleGrid>
            </Stack>
        </Flex>
    );
}
export default Settings;