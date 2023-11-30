import { AddIcon } from "@chakra-ui/icons";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, VStack } from "@chakra-ui/react";
import {PiDotsSixVerticalBold} from "react-icons/pi"
import useFinancesStore from "../../store/finances";
import { useEffect, useState } from "react";
import { Expense } from "../../types/Expenses";

export default function Expenses(){

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {expenses, fetchExpenses, updateExpense, deleteExpense, createExpense, loading} = useFinancesStore();
    const [expenseId, setExpenseId] = useState<number>(0);
    const [handleUpdateExpense, setUpdateExpense] = useState<Expense>({name: "", plan: "", avatar_url: "", id: 0, price: 0})
    const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure()
    const [newExpense, setNewExpense] = useState<Partial<Expense>>({name: "", price: 0, plan: "", avatar_url: ""});

    useEffect(()=>{
        fetchExpenses();
    }, [])

    useEffect(()=>{

        if(expenseId > 0){

            const expenseById = expenses?.find((item)=> item?.id === expenseId);
    
            setUpdateExpense(expenseById as Expense);
    
            onOpen();
        }


    }, [expenseId])

    const fetchUpdateExpense = () => {

        updateExpense(handleUpdateExpense, expenseId)

        fetchExpenses();

        onClose();
    }

    const handleDelete = async () => {
        await deleteExpense(expenseId);

        await fetchExpenses();

        onClose();
    }

    const handleCreateExpense = async () => {
        await createExpense(newExpense);

        await fetchExpenses();

        onCloseCreate();
    }

    return(
            <TableContainer border="1.5px solid" borderRadius="lg" borderColor="gray.300" >
                        <Table variant='simple' >
                            <Thead bg="gray.100" >
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th>Plano</Th>
                                    <Th isNumeric>Gasto</Th>
                                    <Th>
                                        <Button onClick={onOpenCreate} size='xs' leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
                                            Adicionar
                                        </Button>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody bg="white" >
                                {expenses?.map((item)=>(
                                    <Tr key={item?.id} >
                                        <Td fontSize="md" fontWeight="bold" >{item?.name}</Td>
                                        <Td>{item?.plan}</Td>
                                        <Td isNumeric>{item?.price}</Td>
                                        <Td><PiDotsSixVerticalBold style={{cursor: "pointer"}} onClick={()=>setExpenseId(item?.id)} size={17} /></Td>
                                    </Tr>
                                ))}
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
                                    <Input placeholder='Nome' value={handleUpdateExpense?.name} onChange={(e)=>setUpdateExpense({...handleUpdateExpense, name: e.target.value})} />
                                    <Input placeholder='Plano' value={handleUpdateExpense?.plan} onChange={(e)=>setUpdateExpense({...handleUpdateExpense, plan: e.target.value})} />
                                    <Input placeholder='Quantidade gasto' value={handleUpdateExpense?.price} onChange={(e)=>setUpdateExpense({...handleUpdateExpense, price: Number(e.target.value)})} />
                                </VStack>
                                
                            </DrawerBody>

                            <DrawerFooter>
                                <Button colorScheme='red' isLoading={loading} mr={3} onClick={handleDelete}>
                                Excluir
                                </Button>
                                <Button colorScheme='blue' isLoading={loading} onClick={fetchUpdateExpense} >Editar</Button>
                            </DrawerFooter>
                            </DrawerContent>
                        </Drawer>

                        <Drawer
                            isOpen={isOpenCreate}
                            placement='right'
                            onClose={onCloseCreate}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Adicionar Gasto</DrawerHeader>

                            <DrawerBody>
                                <VStack spacing="2rem" >
                                    <Input placeholder='Nome' value={newExpense?.name} onChange={(e)=>setNewExpense({...newExpense, name: e.target.value})} />
                                    <Input placeholder='Plano' value={newExpense?.plan} onChange={(e)=>setNewExpense({...newExpense, plan: e.target.value})} />
                                    <Input placeholder='Quantidade gasto' value={newExpense?.price} onChange={(e)=>setNewExpense({...newExpense, price: Number(e.target.value)})} />
                                </VStack>
                                
                            </DrawerBody>

                            <DrawerFooter>
                                <Button colorScheme='blue' isLoading={loading} onClick={handleCreateExpense} >Criar</Button>
                            </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
        </TableContainer>
    )
}