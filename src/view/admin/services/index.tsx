import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";

import { Service } from '../../../types/AuthContextData'
import { useNavigate } from "react-router";
import ListServicos from "../../../components/admin/Servicos/ListServicos";
import ModalServicos from "../../../components/admin/Servicos/ModalServicos";
import { http } from "../../../services/http";

const ServicesAdmin = () => {

    const router = useNavigate();

    const [serviceId, setServiceId] = useState<null | number>(null);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [dataRequest, setDataRequest] = useState<null | Service[]>(null)

    const onPressModal = (value: number | null = null) => {
        setIsOpenModal(true);
        setServiceId(value);
    }

    const onInit = async () => {
        setIsLoadingPage(true);

        const result = await http.get("/services")
            .then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
            .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }));

        if (result.success) {
            setDataRequest(result?.data);
        }

        setTimeout(() => {
            setIsLoadingPage(false);
        }, 1500)
    }

    const dataFormat = useMemo(() => {
        if (!dataRequest) return [];

        return dataRequest?.map((i, index) => {
            return {
                index,
                ...i
            }
        })
    }, [dataRequest])


    useEffect(() => {
        void onInit();
    }, [])
    return <>
        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"flex-start"} gap={'10px'}>
            <Flex>
                <Text cursor={'pointer'} onClick={() => router(-1)} _hover={{
                    textDecoration: 'underline',
                    color: 'blue'
                }} > Configurações / Admin / Serviços</Text>
            </Flex>
            <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'} >
                <Flex w={'100%'} justify={'space-between'}>
                    <Flex w={'100%'}>

                    </Flex>
                    <Flex w={'100%'} justify={'flex-end'}>
                        <Button onClick={() => onPressModal()} isDisabled={isLoadingPage} isLoading={isLoadingPage} colorScheme="green" size={'sm'} leftIcon={<FaPlus />}>  Novo </Button>
                    </Flex>
                </Flex>
            </Stack>

            <ListServicos dataFormat={dataFormat} isLoadingPage={isLoadingPage} onPressModal={onPressModal} onSuccess={onInit} />
            {
                isOpenModal && <ModalServicos onSuccess={onInit} isOpen={isOpenModal} setIsOpenModal={setIsOpenModal} setServiceId={setServiceId} serviceId={serviceId} />
            }
        </Flex >
    </>
}

export default ServicesAdmin;