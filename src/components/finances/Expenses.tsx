import { AddIcon } from "@chakra-ui/icons";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, VStack } from "@chakra-ui/react";
import {PiDotsSixVerticalBold} from "react-icons/pi"

export default function Expenses(){

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
            <TableContainer border="1.5px solid" borderRadius="lg" borderColor="gray.300" >
                            <Table variant='simple' >
                                <Thead bg="gray.100" >
                                    <Tr>
                                        <Th>Nome</Th>
                                        <Th>Plano</Th>
                                        <Th isNumeric>Gasto</Th>
                                        <Th>
                                            <Button onClick={onOpen} size='xs' leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
                                                Adicionar
                                            </Button>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody bg="white" >
                                <Tr>
                                    <Td fontSize="md" fontWeight="bold" >inches</Td>
                                    <Td>millimetres (mm)</Td>
                                    <Td isNumeric>25.4</Td>
                                    <Td><PiDotsSixVerticalBold style={{cursor: "pointer"}} onClick={onOpen} size={17} /></Td>
                                </Tr>
                                <Tr>
                                    <Td fontSize="md" fontWeight="bold" >feet</Td>
                                    <Td>centimetres (cm)</Td>
                                    <Td isNumeric>30.48</Td>
                                    <Td><PiDotsSixVerticalBold style={{cursor: "pointer"}} onClick={onOpen} size={17} /></Td>
                                </Tr>
                                <Tr>
                                    <Td fontSize="md" fontWeight="bold" >yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                    <Td><PiDotsSixVerticalBold style={{cursor: "pointer"}} onClick={onOpen} size={17} /></Td>
                                </Tr>
                                </Tbody>
                            </Table>
                            <Drawer
                                isOpen={isOpen}
                                placement='right'
                                onClose={onClose}
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Gasto</DrawerHeader>

                                <DrawerBody>
                                    <VStack spacing="2rem" >
                                        <Input placeholder='Type here...' />
                                        <Input placeholder='Type here...' />
                                        <Input placeholder='Type here...' />
                                    </VStack>
                                    
                                </DrawerBody>

                                <DrawerFooter>
                                    <Button colorScheme='red' mr={3} onClick={onClose}>
                                    Excluir
                                    </Button>
                                    <Button colorScheme='blue'>Editar</Button>
                                </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
            </TableContainer>
    )
}