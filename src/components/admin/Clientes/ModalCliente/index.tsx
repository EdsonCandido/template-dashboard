import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../../Loading";
import { http } from "../../../../services/http";
import { toast } from "react-toastify";

type input = {
  clientId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};
const ModalCliente = ({ clientId, isOpen, onClose, onSuccess }: input) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const onCloseModal = () => {
    void onClose();
  };
  const onSubmit = async () => {
    setIsLoadingSubmit(true);

    const request = await http
      .post("/clients", {})
      .then((e) => ({ data: e.data, success: true, message: "OK" }))
      .catch((err) => ({
        data: null,
        success: false,
        message: err.response.data,
      }));

    if (request.success) {
      void onCloseModal();
      void onSuccess();
    }else{
        toast.warn(request.message, {position: 'top-left'});
    }
  };

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
          <Flex w={"100%"}>
            <Loading />
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          {!isLoadingPage && (
            <>
              <Button variant="outline" mr={3} onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={onSubmit}
                isDisabled={isLoadingSubmit}
              >
                Salvar
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalCliente;
