import { Flex, Stack, Text } from "@chakra-ui/react";
import { memo } from "react";
import { useNavigate } from "react-router";
import Card from "../../components/financeiro/Card";
import { numberForMoney } from "../../utils/mask";
import ListFinancial from "../../components/financeiro/ListFinancial";

const FinancialPage = () => {
  const router = useNavigate();
  return (
    <Flex flexDir={"column"} justifyContent={"center"} alignItems={"flex-start"} gap={"10px"}>
      <Flex>
        <Text
          fontWeight={"medium"}
          fontSize={20}
          cursor={"pointer"}
          _hover={{ textDecoration: "underline", color: "blue" }}
        >
          Financeiro
        </Text>
      </Flex>
      <Stack w={"100%"} bg={"white"} borderRadius={"5px"} p={"10px"} gap={"10px"} boxShadow={"lg"}>
        <Flex w={"100%"} gap={5}>
          <Card text="Contas à pagar (R$)" value={numberForMoney(0)} color={"orange.500"} />
          <Card text="Contas à receber (R$)" value={numberForMoney(0)} color={"green.600"} />
          <Card text="Saldo do mês (R$)" value={numberForMoney(0)} />
        </Flex>
      </Stack>

      <ListFinancial dataRequest={[]} />
    </Flex>
  );
};

export default memo(FinancialPage);
