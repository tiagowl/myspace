import { Avatar, Button, Flex, Input, InputGroup, InputRightAddon, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Profile(){
    return(
        <Flex w="100%" h="100%" >
            <Sidebar/>
            <Flex w="100%" flexDirection="column" bg="white" h="100%" >
                <Navbar/>
                <Flex w="100%" h="36" bg="gray.100" >
                
                </Flex>
                <Avatar src='https://bit.ly/dan-abramov' size="2xl" position="absolute" top="12rem" left="19rem" border="2.5px solid white" boxShadow="lg" />
                <Flex w="100%" h="100%" mb="5rem" >
                    <Text fontSize="2xl" fontWeight="medium" mt="5" ml="11rem" >Tiago Winkel Landi</Text>
                </Flex>
                <Flex w="100%" h="100%" flexDirection="row" alignItems="flex-end" justifyContent="space-between" pb="5" px="2.3rem" borderBottom="1px solid" borderBottomColor="gray.200" >
                    <Flex flexDirection="column" >
                        <Text fontSize="xl" fontWeight="medium">Configurações Perfil</Text>
                        <Text fontSize="sm" color="gray.500" >Edite sua foto e mais detalhes aqui.</Text>
                    </Flex>
                    <Flex>
                        <Button bg="white" border="1px solid" borderColor="gray.300" >Cancelar</Button>
                        <Button bg="blackAlpha.900" ml="3"  color="white" fontSize="sm" fontWeight="medium" >Salvar Alterações</Button>
                    </Flex>
                </Flex>
                <Flex w="100%" h="100%" flexDirection="row" alignItems="flex-start" py="5" px="2.3rem" borderBottom="1px solid" borderBottomColor="gray.200" >
                    <Flex flexDirection="column" mr="13.8rem" >
                        <Text fontSize="xl" fontWeight="medium">Perfil Credenciais</Text>
                        <Text fontSize="sm" color="gray.500" >Será suas informações de exibição</Text>
                    </Flex>
                    <Flex flexDirection="column" w="25rem" >
                        <Input mb="3" />
                        <InputGroup w="25rem" size='md'>
                            <Input placeholder='mysite' />
                            <InputRightAddon fontSize="sm" children='@gmail.com' />
                        </InputGroup>
                    </Flex>
                    
                </Flex>
                <Flex w="100%" h="100%" flexDirection="row" alignItems="center" py="5" px="2.3rem" borderBottom="1px solid" borderBottomColor="gray.200" >
                    <Flex flexDirection="column" mr="10rem" >
                        <Text fontSize="xl" fontWeight="medium">Perfil Valores</Text>
                        <Text fontSize="sm" color="gray.500" >Será suas informações em relação ao salário</Text>
                    </Flex>
                    <Flex flexDirection="column" w="25rem" >
                        <Input mb="3" />
                    </Flex>
                    
                </Flex>
            </Flex>
        </Flex>
    );
}