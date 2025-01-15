import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../../Loading";

type input = {
  clientId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};
const ModalCliente = ({ clientId, isOpen, onClose, onSuccess }: input) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const onCloseModal = () => {
    void onClose();
  };
  const onSubmit = async () => {

  }

  const onInit = async () => {
    setIsLoadingPage(true);
    if (clientId) {
        /**
         * TODO pesquisa cliente por id
         */
    }

    setTimeout(() => {
      setIsLoadingPage(false);
    }, 500);
  };

  useEffect(() => {
    if (isOpen) {
      void onInit();
    }
  }, [isOpen]);
  return (
    <Drawer
      onClose={onCloseModal}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isOpen={isOpen}
      size={"sm"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader as="p">
          {clientId ? "Editar Cliente" : "Novo Cliente"}
        </DrawerHeader>
        <DrawerBody>
            <Flex w={'100%'}>
                <Loading/>
            </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalCliente;
