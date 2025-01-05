import { toast } from "react-toastify";
import Loading from "../../../Loading";
import useAuth from "../../../../hooks/auth";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDebounce } from "../../../../hooks/debounced";
import { useEffect, useMemo, useState } from "react";
import {
    Button, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter,
    DrawerHeader, DrawerOverlay, Flex, Input, InputGroup, InputRightElement, Text
} from "@chakra-ui/react";
import { formatCPF } from "../../../../utils/mask";
import isValidCPF from "../../../../utils/isValidCPF";
import { manterApenasNumeros } from "../../../../utils/format";


type Input = {
    isOpen: boolean;
    userId: number | null;
    setUserId: (value: number | null) => void;
    setIsOpenModal: (value: boolean) => void;
    onSuccess: () => Promise<void>;
}

const ModalUsuario = ({ onSuccess, isOpen, userId, setIsOpenModal, setUserId }: Input) => {

    const { validLogin, createNewUser, findUser } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

    const [nomeCompleto, setNomeCompleto] = useState('');
    const [loginTxt, setLoginTxt] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(false);
    const [cpf, setCpf] = useState('');

    const [isDisabled, setIsDisabled] = useState(false);

    const [passwordTxt, setPasswordTxt] = useState('');
    const [passwordConfirmTxt, setPasswordConfirmTxt] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const loginDebounced = useDebounce(loginTxt, 500);
    const [validLoginState, setValidLoginState] = useState(true);

    const [isEditModal, setIsEditModal] = useState(false);


    const validPassword = useMemo(() => {

        const result = { valid: true, message: '' };

        if (passwordTxt.length > 3 || passwordConfirmTxt.length > 3) {



            if (userId && passwordTxt.length < 1) return result;

            if (passwordConfirmTxt != passwordTxt) {
                result.message = 'As senhas não são iguais';
                result.valid = false;
            }

        }

        return result;
    }, [passwordConfirmTxt, passwordTxt, userId]);



    const onSubmit = async () => {
        setIsLoadingSubmit(true);

        toast.dismiss();

        let isInvalid = false;
        if (nomeCompleto.length < 1) {
            toast.warn('Nome do usuário não pode ser vazio', { position: 'top-left' })
            isInvalid = true;
        }

        if (!validPassword.valid) {
            toast.warn(validPassword.message, { position: 'top-left' })
            isInvalid = true;
        }
        if (passwordConfirmTxt.length < 1 && passwordTxt.length < 1 && !userId) {
            toast.warn('Senha do usuário nao pode ser vazia', { position: 'top-left' })
            isInvalid = true;
        }

        if (loginTxt.length < 5 || !loginTxt.includes('@')) {
            toast.warn('Login inválido, tente outro', { position: 'top-left' })
            isInvalid = true;
        }

        if (validLoginState === false) {
            toast.warn('Login inválido, tente outro', { position: 'top-left' })
            isInvalid = true;
        }
        if (cpf.length < 1) {
            toast.warn('CPf não pode ser vazio', { position: 'top-left' })
            isInvalid = true;
        }

        if (isInvalid) {
            toast.warn('Preença todos os campos corretamente', { position: 'top-left' })
            setTimeout(() => {
                setIsLoadingSubmit(false);
            }, 1500);

            return;
        }

        const payload = {
            cod: userId ? userId : undefined,
            is_ativo: isActive ? 1 : 0,
            is_admin: isAdmin ? 1 : 0,
            is_primeiro_acesso: primeiroAcesso ? 1 : 0,
            cpf: manterApenasNumeros(cpf),
            login: loginTxt,
            senha: passwordTxt,
            nome: nomeCompleto,
        }

        const result = await createNewUser(payload);

        if (result.success) {
            toast.success('Usuário cadastrado com sucesso!');

            setIsLoadingSubmit(false);
            onCloseModal();
        } else {
            console.error(result)
            toast.warn(result.message);
        }

        setIsLoadingSubmit(false);
        await onSuccess();
    }

    const onLoadUser = async () => {
        if (userId) {
            const query = await findUser(userId);

            if (query.success) {
                setNomeCompleto(query.data!.nome);
                setLoginTxt(query.data!.login);
                setIsActive(query.data?.is_ativo ? true : false);
                setIsAdmin(query.data?.is_admin ? true : false);
                setPrimeiroAcesso(query.data?.is_primeiro_acesso ? true : false);
                setCpf(query.data!.cpf);
            }

        }
    }

    const onCloseModal = () => {
        setNomeCompleto('');
        setLoginTxt('');
        setIsActive(false);
        setIsAdmin(false);
        setIsOpenModal(false);
        setPrimeiroAcesso(false);
        setUserId(null);
    }

    const onInit = async () => {
        setIsLoading(true);
        if (userId) {
            await onLoadUser();
            setIsEditModal(true);
        }
        setIsLoading(false);
    }

    const checkValidLogin = async (value: string) => {

        const result = await validLogin(value);
        if (result?.data) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (cpf.length > 10) {
            if (isValidCPF(cpf)) {
                setIsDisabled(false)
            }
            if (isValidCPF(cpf) === false) {
                setIsDisabled(true)
            }
        } else {
            setIsDisabled(true)
        }

    }, [cpf])


    useEffect(() => {

        const fetch = async () => {
            if (loginDebounced.length > 3) {

                const result = await checkValidLogin(loginDebounced);
                if (!isEditModal) {
                    if (result) {
                        setValidLoginState(false)
                    } if (!result) {
                        setValidLoginState(true)
                    }
                }

            }
        }

        fetch();

    }, [loginDebounced]);

    useEffect(() => {
        if (isOpen) {
            void onInit()
        }
    }, [isOpen])
    return (
        <Drawer onClose={onCloseModal} closeOnOverlayClick={false} closeOnEsc={false} isOpen={isOpen} size={'sm'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader as='p'>{userId ? 'Editar Usuário' : 'Novo Usuário'}</DrawerHeader>
                <DrawerBody>
                    {isLoading ? <Loading /> :
                        <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
                            <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
                                <Flex>
                                    <Text>Nome</Text><span style={{ color: 'red' }}>*</span>
                                </Flex>
                                <Input isDisabled={isLoadingSubmit} value={nomeCompleto} onChange={e => setNomeCompleto(e.target.value)} type="text" />
                            </Flex>
                            <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
                                <Flex>
                                    <Text>Login</Text><span style={{ color: 'red' }}>*</span>
                                </Flex>
                                <span style={{fontSize:'14px'}}>Seu login deve ser uma e-mail válido.</span>
                                <Input isDisabled={isLoadingSubmit} placeholder="exemple@exemple.com" value={loginTxt} onChange={(e) => setLoginTxt(e.target.value)} type="text" isInvalid={!validLoginState} />
                                {!validLoginState && <span style={{ color: 'red' }}>Email já cadastrado</span>}
                            </Flex>
                            <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
                                <Flex>
                                    <Text>CPF</Text><span style={{ color: 'red' }}>*</span>
                                </Flex>
                                <Input isDisabled={isLoadingSubmit} value={formatCPF(cpf)} onChange={(e) => setCpf(e.target.value)} type="text" />
                                {cpf.length > 10 && !isValidCPF(cpf) && <span style={{ color: 'red' }}>CPF inválido</span>}

                            </Flex>
                            <Flex align={'flex-end'} justify={'center'}>
                                <Flex w={'100%'} p={1} gap={1} flexDir={'column'}>
                                    <Flex>
                                        <Text>Senha</Text>{!userId && <span style={{ color: 'red' }}>*</span>}
                                    </Flex>
                                    <InputGroup>
                                        <Input isDisabled={isLoadingSubmit} isInvalid={!validPassword.valid} onChange={(e) => setPasswordTxt(e.target.value)} value={passwordTxt} type={showPassword ? 'text' : 'password'} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </Flex>
                                <Flex w={'100%'}py={1} gap={1} flexDir={'column'}>
                                    <Flex>
                                        <Text>Confirmação de Senha</Text>{!userId && <span style={{ color: 'red' }}>*</span>}
                                    </Flex>
                                    <InputGroup>
                                        <Input isDisabled={isLoadingSubmit} isInvalid={!validPassword.valid} onChange={(e) => setPasswordConfirmTxt(e.target.value)} value={passwordConfirmTxt} type={showPassword ? 'text' : 'password'} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </Flex>
                            </Flex>
                            {userId && <small>Caso não queira mudar a senha atual, deixe em branco</small>}
                            {
                                !validPassword.valid &&
                                <Flex w={'100%'} justify={'center'} mb={'20px'}>

                                    <span style={{ color: 'red' }}>{validPassword.message}</span>

                                </Flex>
                            }
                            <Flex gap={3} p={1}>
                                <Checkbox isDisabled={isLoadingSubmit} value={isActive ? 1 : 0} defaultChecked={isActive} onChange={e => setIsActive(e.target.checked)}>
                                    Ativo
                                </Checkbox>
                                <Checkbox isDisabled={isLoadingSubmit} value={isAdmin ? 1 : 0} defaultChecked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}>
                                    Admin
                                </Checkbox>
                                <Checkbox isDisabled={isLoadingSubmit} value={primeiroAcesso ? 1 : 0} defaultChecked={primeiroAcesso} onChange={e => setPrimeiroAcesso(e.target.checked)}>
                                    Primeiro Acesso
                                </Checkbox>
                            </Flex>
                        </Flex>}
                </DrawerBody>
                <DrawerFooter>
                    {!isLoading && <>
                        <Button variant='outline' mr={3} onClick={onCloseModal}>
                            Cancelar
                        </Button>
                        <Button colorScheme='blue' onClick={onSubmit} disabled={!validLoginState || isDisabled}>Salvar</Button></>}

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default ModalUsuario; 