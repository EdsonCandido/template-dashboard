import { Flex, Stack, Text } from "@chakra-ui/react";
import { memo, useMemo } from "react";
import Loading from "../../Loading";
import { DataGrid } from "devextreme-react";
import { Column, Pager, Paging, SearchPanel, Selection } from "devextreme-react/data-grid";
import { IconButton } from "rsuite";
import { FaSearch } from "react-icons/fa";
import { dateFormat } from "../../../utils/mask";

type input = {
  dataRequest: Array<any>;
  isLoadingPage: boolean;
};
const ListFinancial = ({ dataRequest, isLoadingPage }: input) => {
  const dataFormat = useMemo(() => {
    if (!dataRequest) return [];

    return [];
  }, [dataRequest]);

  return (
    <Flex w={"100%"}>
      {isLoadingPage ? (
        <Stack w={"100%"} bg={"white"} borderRadius={"5px"} p={"10px"} gap={"10px"} boxShadow={"sm"}>
          <Loading />
        </Stack>
      ) : (
        <Stack w={"100%"} bg={"white"} borderRadius={"5px"} p={"10px"} gap={"10px"} boxShadow={"sm"}>
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
              caption={" - "}
              dataField="cod"
              alignment={"center"}
              fixedPosition={"right"}
              type="buttons"
              width={"120px"}
              allowResizing={false}
              cellRender={() => (
                <Flex gap={3} justifyContent={"center"} align={"center"}>
                  <IconButton icon={<FaSearch color="gray" size={20} />} onClick={() => {}} />
                </Flex>
              )}
            />

            <Column
              caption="Criado em."
              dataField="created_at"
              minWidth={100}
              cellRender={(e) => <Text> {dateFormat(e.value, "dd/MM/yyyy")}</Text>}
            />
            <Column caption="Pago" alignment={"center"} dataField="descricao" />
            <Column
              caption="Tipo"
              dataField="titulo"
              minWidth={110}
              alignment={"center"}
              cellRender={(e) => <Text>{e.value}</Text>}
            />
            <Column caption="Descrição" alignment={"center"} dataField="descricao" />
            <Column caption="Valor (R$)" alignment={"center"} dataField="descricao" />

            <Column caption="Pago" alignment={"center"} dataField="descricao" />
            <Column
              caption="Dt. Vencimento"
              alignment={"center"}
              dataField="dt_inicio"
              cellRender={(e) => <Text>{dateFormat(e.value, "dd/MM/yyyy")}</Text>}
            />
          </DataGrid>
        </Stack>
      )}
    </Flex>
  );
};

export default memo(ListFinancial);
