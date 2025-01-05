import { Stack, Text } from "@chakra-ui/react";

import { DataGrid } from "devextreme-react";
import { Column, Pager, Paging, SearchPanel, Selection, Button as ButtonGrid } from "devextreme-react/data-grid";
import { dateFormat, formatCPF } from "../../../../utils/mask";
import Loading from "../../../Loading";
import { User } from "../../../../types/AuthContextData";

type dataFormat = User & { index: number };

type Input = {
    isLoadingPage: boolean;
    onPressModal: (value: number | null) => void;
    dataFormat: dataFormat[]
}

const ListUser = ({ isLoadingPage, dataFormat, onPressModal }: Input) => {

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
                        <Column caption={" - "} dataField={'cod'} alignment={'center'} fixedPosition={"right"} type="buttons" width={"50px"} allowResizing={false}>
                            <ButtonGrid icon="search" onClick={(e: { row: { data: { cod: number } } }) => { openModalEdit(e.row.data.cod) }} />
                        </Column>
                        <Column caption="Criado em." dataField="created_at" minWidth={100} cellRender={(e) => <Text> {dateFormat(e.value, 'dd/MM/yyyy')}</Text>} />
                        <Column caption="Usuário" dataField="nome" minWidth={110} alignment={'center'} cellRender={(e) => <Text>{e.value}</Text>} />
                        <Column caption="Login" alignment={'center'} dataField="login" />
                        <Column caption="CPF" alignment={'center'} dataField="cpf" cellRender={(e) => <Text>{formatCPF(e.value)}</Text>} />
                        <Column caption="Admin" alignment={'center'} dataField="is_admin" cellRender={(e) => handerSimNao(e.value)} />
                        <Column caption="Ativo" alignment={'center'} dataField="is_ativo" cellRender={(e) => handerSimNao(e.value)} />
                        <Column caption="Primeiro Acesso" alignment={'center'} dataField="is_primeiro_acesso" cellRender={(e) => handerSimNao(e.value)} />
                        
                    </DataGrid>
                </Stack>
        }

    </>
}

export default ListUser;