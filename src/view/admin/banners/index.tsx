import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import useAuth from "../../../hooks/auth";

import { Banner } from '../../../types/AuthContextData'
import { useNavigate } from "react-router";
import ListBanners from "../../../components/admin/Banners/ListBanners";
import ModalBanner from "../../../components/admin/Banners/ModalBanner";

const BannersAdmin = () => {

    const router = useNavigate();

    const { listBannersAdmin } = useAuth();

    const [bannerId, setBannerId] = useState<null | number>(null);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [dataRequest, setDataRequest] = useState<null | Banner[]>(null)

    const onPressModal = (value: number | null = null) => {
        setIsOpenModal(true);
        setBannerId(value);
    }

    const onInit = async () => {
        setIsLoadingPage(true);

        const result = await listBannersAdmin();

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
                }} > Configurações / Admin / Banners</Text>
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

            <ListBanners dataFormat={dataFormat} isLoadingPage={isLoadingPage} onPressModal={onPressModal} onSuccess={onInit} />
            {
                isOpenModal && <ModalBanner onSuccess={onInit} isOpen={isOpenModal} setIsOpenModal={setIsOpenModal} setBannerId={setBannerId} bannerId={bannerId} />
            }
        </Flex >
    </>
}

export default BannersAdmin;