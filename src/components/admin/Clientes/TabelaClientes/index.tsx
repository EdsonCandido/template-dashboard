import { Flex, Text } from "@chakra-ui/react";
import { DataGrid } from "devextreme-react";
import {
  Column,
  Pager,
  Paging,
  SearchPanel,
  Selection,
} from "devextreme-react/data-grid";
import { useMemo } from "react";
import { dateFormat, formatCpfCnpj } from "../../../../utils/mask";
import { FaCheckCircle, FaSearch, FaTimesCircle } from "react-icons/fa";
import { IconButton } from "rsuite";

type input = {
  dataRequest: null | [];
  openModal: (value: number) => void;
};
const TabelaClientes = ({ dataRequest, openModal }: input) => {
  const dataFormat = useMemo(() => {
    if (dataRequest == null) return [];

    return [];
  }, [dataRequest]);

  const handerSimNao = (value: 1 | 0) => {
    return (
      <>
        <p
          style={{
            backgroundColor: value ? "#38a169" : "#e53e3e",
            borderRadius: "5px",
            color: "white",
            textAlign: "center",
            height: "20px",
            paddingRight: "5px",
            paddingLeft: "5px",
          }}
        >
          {value ? "Sim" : "Não"}
        </p>
      </>
    );
  };

  const handlerOptions = (key: number, isActive: boolean) => {
    return (
      <Flex gap={3} justifyContent={"center"} align={"center"}>
        <IconButton
          icon={<FaSearch color="gray" size={20} />}
          onClick={() => openModal(key)}
        />

        {isActive ? (
          <IconButton
            icon={<FaTimesCircle color="#e53e3e" size={20} />}
            onClick={() => {}}
          />
        ) : (
          <IconButton
            icon={<FaCheckCircle color="#38a169" size={20} />}
            onClick={() => {}}
          />
        )}
      </Flex>
    );
  };

  return (
    <DataGrid
      dataSource={dataFormat}
      keyExpr={"cod"}
      width="100%"
      height={"35hw"}
      hoverStateEnabled={true}
      showRowLines={true}
      allowColumnResizing={true}
      columnAutoWidth={true}
      showBorders={true}
    >
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
        caption="#"
        dataField="#"
        minWidth={50}
        alignment={"center"}
        cellRender={(e) => handlerOptions(e.data.clientId, e.data.isActive)}
      />
      <Column
        caption="#"
        dataField="clientId"
        minWidth={50}
        alignment={"center"}
        cellRender={(e) => <Text> {e.value}</Text>}
      />
      <Column
        caption="Ativo"
        alignment={"center"}
        dataField="isActive"
        cellRender={(e) => handerSimNao(e.value)}
      />
      <Column
        caption="CPF/CNPJ"
        dataField="cpfCnpj"
        alignment={"center"}
        cellRender={(e) => <Text>{formatCpfCnpj(e.value)}</Text>}
      />
      <Column
        caption="Nome fantasia"
        dataField="fantasyName"
        cellRender={(e) => <Text>{e.value}</Text>}
      />
      <Column
        caption="Razão social"
        dataField="corporateReason"
        cellRender={(e) => <Text>{e.value}</Text>}
      />
      <Column
        caption="Criado em."
        dataField="createAt"
        minWidth={100}
        cellRender={(e) => <Text> {dateFormat(e.value, "dd/MM/yyyy HH:mm")}</Text>}
      />
    </DataGrid>
  );
};

export default TabelaClientes;
