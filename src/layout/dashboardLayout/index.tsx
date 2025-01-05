import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Image,
    Divider,
} from '@chakra-ui/react'
import { FiSettings, FiMenu, FiBell, FiChevronDown, } from 'react-icons/fi'
import { IconType } from 'react-icons'
import { AiOutlineUser } from "react-icons/ai";

import useAuth from "../../hooks/auth";

import logoSvg from '../../assets/logo/AABB-azul.svg'
import logoSvgAmarela from '../../assets/logo/AABB-amarelo.svg'


type NavItemProps = FlexProps & {
    icon: IconType
    children: React.ReactNode
    path?: string
}

type MobileProps = FlexProps & {
    onOpen: () => void
}

type SidebarProps = BoxProps & {
    onClose: () => void
}


const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {


    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            p={4}
            {...rest} >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" >

                <Image src={logoSvg} alt="Logo" w={'100%'} h={'100%'} />

                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Divider colorScheme="gray" my='20px'/>
            <Flex w="100%" direction="column" justifyContent="center" alignItems="center"  >
                <NavItem icon={FiSettings} path={'/admin/settings'} >Configurações</NavItem>
            </Flex>
        </Box>
    )
}

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {

    const router = useNavigate();
    const location = useLocation()
    const pathname = window.location.pathname;

    const ref = location.state?.ref ? location.state?.ref : '';

    if (pathname === path || path == ref) {
        rest.bg = '#030067';
        rest.color = 'white';
    }

    return (
        <Box
            w='100%'
            as="a"
            onClick={() => path && router(path)}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                w='100%'
                align="center"
                p="3"
                //m={1}
                //  mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'blue.800',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="18"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    )
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const { signOut, user } = useAuth();
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="70px"
            alignItems="center"
            bg={useColorModeValue('#030067', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>


            <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant="outline" aria-label="open menu"
                _hover={{ bg: 'blue.400' }} color={useColorModeValue('white', 'gray.900')} icon={<FiMenu />}
            />

            <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold" justifyContent={'center'}>
                <Image src={logoSvgAmarela} alt="Logo" w={'40%'} h={'40%'} />
            </Text>


            <HStack spacing={{ base: '0', md: '2' }}>
                <IconButton size="md" variant="ghost" _hover={{ bg: 'blue.400' }} aria-label="open menu" icon={<FiBell size={22} />} color="white" />
                <Flex alignItems={'center'} >
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar size={'md'} name={user?.nome} icon={<AiOutlineUser fontSize='1.5rem' color="white" />} />
                                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                                    <Text fontSize="sm" color="white">{user?.nome}</Text>
                                    <Text fontSize="xs" color="white">
                                        {/* {user?.is_admin === 1 ? 'Administrador' : 'Cliente'} */}
                                        Administrador
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown color="white" />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Perfil</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={signOut}>Sair</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

const DashboardLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Outlet />
            </Box>
        </Box>
    )
}

export default DashboardLayout;
