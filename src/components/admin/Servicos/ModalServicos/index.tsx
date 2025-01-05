import { toast } from "react-toastify";
import Loading from "../../../Loading";
import { useEffect, useState } from "react";
import {
    Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter,
    DrawerHeader, DrawerOverlay, Flex, Image, Input, Text
} from "@chakra-ui/react";
import { FileUploader } from "devextreme-react";
import { http } from "../../../../services/http";


type Input = {
    isOpen: boolean;
    serviceId: number | null;
    setServiceId: (value: number | null) => void;
    setIsOpenModal: (value: boolean) => void;
    onSuccess: () => Promise<void>;
}

const ModalServicos = ({ onSuccess, isOpen, serviceId, setIsOpenModal, setServiceId }: Input) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dt_inicio, setDt_inicio] = useState('');
    const [dt_fim, setDt_fim] = useState('');
    const [isAtivo, setIsAtivo] = useState(false);

    const [arquivo_capa, setArquivo_capa] = useState<File>();
    const [arquivo_conteudo, setArquivo_conteudo] = useState<File>();

    const [capa64, setCapa64] = useState('');
    const [conteudo64, setConteudo64] = useState('');

    const [isEditModal, setIsEditModal] = useState(false);

    const onSubmit = async () => {
        setIsLoadingSubmit(true);

        toast.dismiss();

        let isInvalid = false;
        if (titulo.length < 1) {
            toast.warn('Título do Serviço não pode ser vazio', { position: 'top-left' })
            isInvalid = true;
        }

        if (dt_inicio.length < 1) {
            toast.warn('Data de inicio não pode ser vazia', { position: 'top-left' })
            isInvalid = true;
        }
        if (dt_fim.length < 1) {
            toast.warn('Data final não pode ser vazia', { position: 'top-left' })
            isInvalid = true;
        }

        if (dt_inicio > dt_fim) {
            toast.warn('Data de inicio nao pode ser maior que a data final', { position: 'top-left' })
            isInvalid = true;
        }

        if (!isEditModal) {
            if (!arquivo_capa) {
                toast.warn('Você deve anexar uma capa', { position: 'top-left' })
                isInvalid = true;
            }
            if (!arquivo_conteudo) {
                toast.warn('Você deve anexar uma imagem de conteúdo', { position: 'top-left' })
                isInvalid = true;
            }
        }

        if (isInvalid) {
            toast.warn('Preença todos os campos corretamente', { position: 'top-left' })
            setTimeout(() => {
                setIsLoadingSubmit(false);
            }, 1500);

            return;
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descricao", descricao);
        formData.append("dt_inicio", dt_inicio);
        formData.append("dt_fim", dt_fim);

        if (!isEditModal) {
            formData.append("is_ativo", '1');
        } else {
            formData.append("is_ativo", isAtivo ? '1' : '0');
        }


        if (arquivo_capa) {
            formData.append("arquivo_capa", arquivo_capa);
        }
        if (arquivo_conteudo) {
            formData.append("arquivo_conteudo", arquivo_conteudo);
        }
        if (serviceId) {
            formData.append("cod", serviceId.toString());
        }


        const result = await http.post("/services/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
            .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }));


        if (result.success) {
            if (isEditModal) {
                toast.success('Serviço editado com sucesso!', { position: 'top-left' });
            } else {
                toast.success('Serviço cadastrado com sucesso!', { position: 'top-left' });
            }


            setIsLoadingSubmit(false);
            onCloseModal();
        } else {
            console.error(result)
            toast.warn(result.message);
        }

        setIsLoadingSubmit(false);
        await onSuccess();
    }

    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }


    const onLoadBanner = async () => {

        if (serviceId) {
            const query = await http.get('/services/' + serviceId)
                .then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
                .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }));

            if (query.success) {
                setTitulo(query.data!.titulo);
                setDescricao(query.data!.descricao);
                setIsAtivo(query.data?.is_ativo ? true : false);
                setDt_fim(formatDateForInput(query.data!.dt_fim));
                setDt_inicio(formatDateForInput(query.data!.dt_inicio));
                setCapa64(query.data!.arquivo_capa);
                setConteudo64(query.data!.arquivo_conteudo);

            }


        }
    }


    const onCloseModal = () => {
        setTitulo('');
        setDescricao('');
        setIsAtivo(false);
        setIsOpenModal(false);
        setDt_fim('');
        setDt_inicio('');
        setServiceId(null);
    }

    const onInit = async () => {
        setIsLoading(true);
        if (serviceId) {
            await onLoadBanner();
            setIsEditModal(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (isOpen) {
            void onInit()
        }
    }, [isOpen])

    useEffect(() => {
        const getBase64Async = async () => {
            if (arquivo_capa) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result as string;

                    const base64WithoutPrefix = base64.split(',')[1];

                    setCapa64(base64WithoutPrefix);
                };
                reader.readAsDataURL(arquivo_capa);
            }
        };

        if (arquivo_capa) {
            getBase64Async();
        }
    }, [arquivo_capa]);

    useEffect(() => {
        const getBase64Async = async () => {
            if (arquivo_conteudo) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result as string;

                    const base64WithoutPrefix = base64.split(',')[1];

                    setConteudo64(base64WithoutPrefix);
                };
                reader.readAsDataURL(arquivo_conteudo);
            }
        };

        if (arquivo_conteudo) {
            getBase64Async();
        }
    }, [arquivo_conteudo]);



    return (
        <Drawer onClose={onCloseModal} closeOnOverlayClick={false} closeOnEsc={false} isOpen={isOpen} size={'md'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader as='p'>{serviceId ? 'Editar Serviço' : 'Novo Serviço'}</DrawerHeader>
                <DrawerBody>
                    {isLoading ? <Loading /> :
                        <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
                            <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
                                <Flex>
                                    <Text>Título</Text><span style={{ color: 'red' }}>*</span>
                                </Flex>
                                <Input isDisabled={isLoadingSubmit} value={titulo} onChange={e => setTitulo(e.target.value)} type="text" />
                            </Flex>
                            <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
                                <Text>Descrição</Text>
                                <Input isDisabled={isLoadingSubmit} value={descricao} onChange={(e) => setDescricao(e.target.value)} type="text" />
                            </Flex>
                            <Flex>
                                <Flex w={'50%'} p={1} gap={1} flexDir={'column'}>
                                    <Flex>
                                        <Text>Data Inicio</Text><span style={{ color: 'red' }}>*</span>
                                    </Flex>
                                    <Input isDisabled={isLoadingSubmit} value={dt_inicio} onChange={(e) => setDt_inicio(e.target.value)} type="date" />

                                </Flex>
                                <Flex w={'50%'} p={1} gap={1} flexDir={'column'}>
                                    <Flex>
                                        <Text>Data Fim</Text><span style={{ color: 'red' }}>*</span>
                                    </Flex>
                                    <Input isDisabled={isLoadingSubmit} value={dt_fim} onChange={(e) => setDt_fim(e.target.value)} type="date" />
                                </Flex>
                            </Flex>
                            <Flex p={1} align={'center'} justify={'center'} direction={'column'}>
                                <Flex direction={'column'}>
                                    <Flex>
                                        <Text>Capa</Text><span style={{ color: 'red' }}>*</span>
                                    </Flex>
                                    <FileUploader
                                        accept="image/*"
                                        value={arquivo_capa ? [arquivo_capa] : []}
                                        onValueChange={(e) => {
                                            if (e && e[0]) {
                                                setArquivo_capa(e[0]);
                                            } else {
                                                setArquivo_capa(undefined);
                                            }
                                        }}
                                        uploadMode="useForm"
                                    />
                                </Flex>
                                {capa64 && (
                                    <Flex align={'center'} justify={'center'} direction={'column'}>
                                        <Image src={`data:image/jpg;base64,${capa64}`} alt="capa" width={'80%'} />
                                    </Flex>
                                )}
                                <Divider my={4} />
                                <Flex direction={'column'}>
                                    <Flex>
                                        <Text>Conteúdo</Text><span style={{ color: 'red' }}>*</span>
                                    </Flex>
                                    <FileUploader
                                        accept="image/*"
                                        value={arquivo_conteudo ? [arquivo_conteudo] : []}
                                        onValueChange={(e) => {
                                            if (e && e[0]) {
                                                setArquivo_conteudo(e[0]);
                                            } else {
                                                setArquivo_conteudo(undefined);
                                            }
                                        }}
                                        uploadMode="useForm"
                                    />
                                </Flex>

                                {conteudo64 && (
                                    <Flex align={'certer'} justify={'center'} direction={'column'}>
                                        <Image src={`data:image/jpg;base64,${conteudo64}`} alt="conteudo" width={'100%'} />
                                    </Flex>
                                )}
                            </Flex>

                        </Flex>}
                </DrawerBody>
                <DrawerFooter>
                    {!isLoading && <>
                        <Button variant='outline' mr={3} onClick={onCloseModal}>
                            Cancelar
                        </Button>
                        <Button colorScheme='blue' isDisabled={isLoadingSubmit} onClick={onSubmit}>Salvar</Button></>}

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default ModalServicos; 