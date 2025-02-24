import { Flex, ResponsiveValue, Text } from "@chakra-ui/react";
import { memo } from "react";

type input = {
  text: string;
  value?: string;
  color?: ResponsiveValue<string>;
};
const Card = ({ text, value, color = "gray.500" }: input) => {
  return (
    <Flex w={"100%"} p={5} gap={1} align={"center"} justify={"center"} flexDir={"column"} bgColor={color}>
      <Text color={"#fff"} fontSize={18} fontWeight={"bold"}>
        {text}
      </Text>

      {value && (
        <Text color={"#fff"} fontWeight={"bold"}>
          {value}
        </Text>
      )}
    </Flex>
  );
};
export default memo(Card);
