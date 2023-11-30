import { AddIcon } from "@chakra-ui/icons";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, VStack, useDisclosure } from "@chakra-ui/react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import useFinancesStore from "../../store/finances";
import { useEffect, useState } from "react";
import { Savings } from "../../types/Savings";

export default function SavingsTable(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {fetchSavings, savings, updateSaving, featchCreateSaving, loading, deleteSaving} = useFinancesStore();
    const [savingId, setSavingId] = useState<number>(0);
    const [savingUpdate, setSavingUpdate] = useState<Savings | null>(null);
    const { isOpen: isCreate, onOpen: onCreate, onClose: onCloseCreate } = useDisclosure();
    const [createSaving, setCreateSaving] = useState<Savings | null>(null);


    useEffect(()=>{
        fetchSavings();
    }, [])

    useEffect(()=>{
        if(savingId > 0){
            const savingbyId = savings.find((item)=> item.id === savingId);

            setSavingUpdate(savingbyId as Savings);

            onOpen();
        }
    }, [savingId]);

    const handleUpdate = async () => {

        await updateSaving(savingUpdate as Savings, savingId);

        await fetchSavings();

        onClose();
    }

    const handleCreate = async () => {
        await featchCreateSaving(createSaving as Savings);

        await fetchSavings();

        onCloseCreate();
    }

    const handleDelete = async() => {
        await deleteSaving(savingId);

        await fetchSavings();

        onClose();
    }

    return(
        <TableContainer border="1.5px solid" borderRadius="lg" borderColor="gray.300" >
        <Table variant='simple' >
            <Thead bg="gray.100" >
                <Tr>
                    <Th>Nome</Th>
                    <Th>Gasto</Th>
                    <Th>
                        <Button onClick={onCreate} size='xs' leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
                            Adicionar
                        </Button>
                    </Th>
                </Tr>
            </Thead>
            <Tbody bg="white" >
                {savings?.map((item)=>(
                    <Tr key={item?.id} >
                        <Td fontSize="md" fontWeight="bold" >{item?.name}</Td>
                        <Td>{item?.expense}</Td>
                        
                        <Td><PiDotsSixVerticalBold style={{cursor: "pointer"}} onClick={()=>setSavingId(item?.id)} size={17} /></Td>
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
                    <Input value={savingUpdate?.name} onChange={(e)=>setSavingUpdate({...savingUpdate, name: e.target.value} as Savings)} placeholder='Type here...' />
                    <Input value={savingUpdate?.expense} onChange={(e)=>setSavingUpdate({...savingUpdate, expense: Number(e.target.value)} as Savings)} placeholder='Type here...' />
                </VStack>
                
            </DrawerBody>

            <DrawerFooter>
                <Button colorScheme='red' isLoading={loading} mr={3} onClick={handleDelete}>
                Excluir
                </Button>
                <Button onClick={handleUpdate} isLoading={loading} colorScheme='blue'>Criar</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>

        <Drawer
            isOpen={isCreate}
            placement='right'
            onClose={onCloseCreate}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Gasto</DrawerHeader>

            <DrawerBody>
                <VStack spacing="2rem" >
                    <Input value={createSaving?.name} onChange={(e)=>setCreateSaving({...createSaving, name: e.target.value} as Savings)} placeholder='Nome' />
                    <Input value={createSaving?.expense} onChange={(e)=>setCreateSaving({...createSaving, expense: Number(e.target.value)} as Savings)} placeholder='Quantidade Gasto' />
                </VStack>
                
            </DrawerBody>

            <DrawerFooter>
                <Button onClick={handleCreate} isLoading={loading} colorScheme='blue'>Editar</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
</TableContainer>
    )
}