import { Flex, Stack, Text } from "@chakra-ui/react";

import { DataGrid } from "devextreme-react";
import { Column, Pager, Paging, SearchPanel, Selection } from "devextreme-react/data-grid";
import { dateFormat } from "../../../../utils/mask";
import Loading from "../../../Loading";
import { Service } from "../../../../types/AuthContextData";
import { http } from "../../../../services/http";
import { toast } from "react-toastify";
import { FaCheckCircle, FaSearch, FaTimesCircle } from "react-icons/fa";
import { IconButton } from "rsuite";

type dataFormat = Service & { index: number };

type Input = {
    isLoadingPage: boolean;
    onPressModal: (value: number | null) => void;
    dataFormat: dataFormat[];
    onSuccess: () => Promise<void>;
}

const ListServicos = ({ isLoadingPage, dataFormat, onPressModal, onSuccess }: Input) => {

    const openModalEdit = (value: number) => {
        onPressModal(value)
    }

    const handerSimNao = (value: 1 | 0) => {
        return (<>
            <p
                style={{
                    backgroundColor: value ? '#38a169' : '#e53e3e',
                    borderRadius: "5px",
                    color: "white",
                    textAlign: "center",
                    height: "20px",
                    paddingRight: "5px",
                    paddingLeft: "5px",
                }}>
                {value ? 'Sim' : 'Não'}
            </p>
        </>)

    }

    const handleAtivo = async (cod: number, is_ativo: number) => {
        const result = await http.delete("services/" + cod)
            .then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
            .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }));

        if (result.success) {
            toast.success(`Servico ${is_ativo === 1 ? 'desativado' : 'ativado'} com sucesso`);
            await onSuccess();
        } else {
            toast.error(result.message);
        }
    }

    return <>

        {
            isLoadingPage ?
                <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'} >
                    <Loading />
                </Stack>
                : <Stack w={'100%'} bg={'white'} borderRadius={'5px'} p={'10px'} gap={'10px'} boxShadow={'lg'} >
                    <DataGrid
                        dataSource={dataFormat} keyExpr={"cod"} width="100%" height={"35hw"}
                        hoverStateEnabled={true} showRowLines={true} allowColumnResizing={true}
                        columnAutoWidth={true} showBorders={true}>
                        <Pager
                            showPageSizeSelector={true}
                            showNavigationButtons={true}
                            showInfo={true}
                            infoText="Total de itens: {2} "
                            visible={true}
                        />
                        <SearchPanel visible={true} />
                        <Paging defaultPageSize={25} enabled={true} />
                        <Selection mode="single" />
                        <Column
                            caption={" - "}
                            dataField="cod" 
                            alignment={'center'}
                            fixedPosition={"right"}
                            type="buttons"
                            width={"120px"}
                            allowResizing={false}
                            cellRender={(e) => (
                                <Flex gap={3} justifyContent={"center"} align={"center"}>
                                    <IconButton
                                        icon={<FaSearch color="gray" size={20}/>}
                                        onClick={() => openModalEdit(e.row.data.cod)}
                                    />
                                    
                                    {e.row.data.is_ativo === 0 ? (
                                        <IconButton
                                            icon={<FaTimesCircle color="#e53e3e" size={20}  />}
                                            onClick={() => { handleAtivo(e.row.data.cod, e.row.data.is_ativo);  }}
                                        />
                                    ) : (
                                        <IconButton
                                            icon={<FaCheckCircle color="#38a169" size={20} />}
                                            onClick={() => handleAtivo(e.row.data.cod, e.row.data.is_ativo)}
                                        />
                                    )}
                                </Flex>
                            )}
                        />



                        <Column caption="Criado em." dataField="created_at" minWidth={100} cellRender={(e) => <Text> {dateFormat(e.value, 'dd/MM/yyyy')}</Text>} />
                        <Column caption="Título" dataField="titulo" minWidth={110} alignment={'center'} cellRender={(e) => <Text>{e.value}</Text>} />
                        <Column caption="Descrição" alignment={'center'} dataField="descricao" />
                        <Column caption="Dt. Início" alignment={'center'} dataField="dt_inicio" cellRender={(e) => <Text>{dateFormat(e.value, 'dd/MM/yyyy')}</Text>} />
                        <Column caption="Dt. Fim" alignment={'center'} dataField="dt_fim" cellRender={(e) => <Text>{dateFormat(e.value, 'dd/MM/yyyy')}</Text>} />
                        <Column caption="Ativo" alignment={'center'} dataField="is_ativo" cellRender={(e) => handerSimNao(e.value)} />

                    </DataGrid>
                </Stack >
        }

    </>
}

export default ListServicos;