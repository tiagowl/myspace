import { Flex, HStack, Circle, Tag, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props{
    name: string;
    numOfTasks: number;
    colorCircle: string;
    children: ReactNode;
    statusId: number;
}

export default function Status(props: Props){
    return(
        <Flex flexDirection="column" w="25%" h="100%">
                <Flex w="100%" mb="3" justifyContent="space-between" >
                    <HStack  alignItems="center" spacing="3" >
                        <Circle size="10px" bg={props.colorCircle} ></Circle>
                        <Text fontWeight="medium" fontSize="md" >{props.name}</Text>
                        <Tag bg="white" >{props.numOfTasks}</Tag>    
                    </HStack>
                </Flex>
                <VStack spacing="5">
                    {props.children}    
                </VStack>    
        </Flex>
    )
}