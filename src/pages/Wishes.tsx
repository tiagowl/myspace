import { AddIcon, ChevronLeftIcon, ChevronRightIcon, Search2Icon } from "@chakra-ui/icons";
import { Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Heading, VStack, Text, Circle, HStack, Input, InputGroup, InputLeftElement, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure, Textarea, Select, Square } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import { LuFileSymlink } from "react-icons/lu";
import { RxDragHandleDots2 } from "react-icons/rx";
import useWishesStore from "../store/wishes";
import { useEffect, useState } from "react";
import { CgGames } from "react-icons/cg";
import { AiFillBulb } from "react-icons/ai";
import Wish from "../types/Wishes";
import { useNavigate } from "react-router-dom";

export default function Wishes(){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: openCreate, onOpen: onOpenCreate, onClose: closeCreate } = useDisclosure();
    const {fetchWishes, wishes, updateWish, createWish, deleteWish, searchByName} = useWishesStore();
    const [wishId, setWishId] = useState(0);
    const [wishUpdate, setWishUpdate] = useState<Partial<Wish> | null>(null);
    const [wishCreate, setWishCreate] = useState<Partial<Wish | null>>(null);
    const [textSearch, setTextSearch] = useState("");
    const [initialIndex, setInitialIndex] = useState(0);
    const [numPerPage] = useState(5);
    const navigate = useNavigate();

    const iconWish = (id: number) => {
        switch(id){
            case 1:
                return <CgGames color="white"/>
            case 2: 
                return <FaBook color="white" />
            case 3: 
                return <AiFillBulb color="white" />
        }
    }

    const getWishById = () => {
        const wishById = wishes.find((item)=> item?.id === wishId);

        setWishUpdate(wishById as Partial<Wish>);

        onOpen();
    }

    const handleUpdateWish = async () => {
        await updateWish(wishId, wishUpdate as Partial<Wish>);

        await fetchWishes(initialIndex, numPerPage - 1);

        onClose();
    }

    const handleCreateWish = async () => {
        await createWish(wishCreate as Partial<Wish>);

        await fetchWishes(initialIndex, numPerPage - 1);

        closeCreate();        
    }

    const handleDeleteWish = async () => {
        await deleteWish(wishId);

        await fetchWishes(initialIndex, numPerPage - 1);

        onClose();
    }

    const handleSearchByText = async () => {
        if(textSearch.length > 0){
            await searchByName(textSearch);
        }else if(textSearch.length === 0){
            await fetchWishes(initialIndex, numPerPage - 1);
        }
    }

    const handleChangePage = async() => {
        if(initialIndex > 0){
            await fetchWishes(initialIndex + numPerPage - 1, numPerPage + initialIndex + 3);
        }else if(initialIndex === 0) {
            await fetchWishes(initialIndex, numPerPage - 1);
        }
    } 

    useEffect(()=>{
         fetchWishes(initialIndex, numPerPage - 1);
    }, [])

    useEffect(()=>{
        getWishById();
    }, [wishId])

    useEffect(()=>{
        handleSearchByText();
    }, [textSearch])

    useEffect(()=>{
        handleChangePage();
    }, [initialIndex]);

    return(
        <Flex w="100%" pl="5" h="100%" bg="gray.50" >
            <Flex w="350px" mr="7" mt="5" h="100%" >
                <Card w="100%" boxShadow="sm" h="200px" border="1px solid" borderColor="gray.200" >
                    <CardHeader>
                    <Heading size='sm'>Tipos de Desejos</Heading>
                    </CardHeader>
                    <CardBody display="Flex" justifyContent="flex-start" >
                        <VStack>
                            <Checkbox fontSize="xs"  defaultChecked>Livros</Checkbox>
                            <Checkbox fontSize="xs" defaultChecked>Games</Checkbox>
                            <Checkbox fontSize="xs" defaultChecked>Outros</Checkbox>
                        </VStack>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </Flex>
            <Flex w="75%" mt="5" h="100%" flexDirection="column" >

                <Flex w="100%" justifyContent="flex-end" mb="7" >
                    <Button bg="green.500" color="white" onClick={onOpenCreate} leftIcon={<AddIcon color="white" />} >Adicionar Desejo</Button>
                </Flex>

                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                    <Search2Icon color='gray.300' />
                    </InputLeftElement>
                    <Input w="100%" boxShadow="sm" value={textSearch} onChange={(e)=>setTextSearch(e.target.value)} bg="white" mb="7" border="1px solid" borderColor="gray.200" type='tel' placeholder='Procurar por nome' />
                </InputGroup>

                <Text mb="3" fontSize="md" color="gray.500" >Mostrando {wishes.length} desejos</Text>

                <VStack w="100%" mb="7" minH="47vh" >
                    {wishes.map((item)=>(
                        <Card key={item?.id} w="100%" boxShadow="sm" h="80px"  border="1px solid" borderColor="gray.200"  >
                            <CardBody display="flex" alignItems="center" justifyContent="space-between" >
                                <Flex>
                                    <Circle size="2.5rem" mr="5" bg="blue.400" >
                                        {iconWish(item?.type_id)}
                                    </Circle>
                                    <Flex flexDirection="column" alignItems="flex-start" >
                                        <Text fontSize="lg" onClick={()=>setWishId(item?.id)} fontWeight="semibold" cursor="pointer" >{item?.name}</Text>
                                        <Text fontSize="sm" >{item?.link.slice(0,48)}...</Text>
                                    </Flex>
                                </Flex>
                                <HStack>
                                    <IoIosLink fontSize={20} />
                                    <LuFileSymlink style={{cursor: "pointer"}} fontSize={20} onClick={()=>navigate(item?.link)} />
                                    <RxDragHandleDots2 onClick={()=>setWishId(item?.id)} style={{cursor: "pointer"}} fontSize={20} />
                                </HStack>
                            </CardBody>
                        </Card>
                    ))}
                </VStack>

                <HStack w="100%" display="flex" justifyContent="center" >
                    {initialIndex > 0 && <Square size="9" bg="white" cursor="pointer" onClick={()=>setInitialIndex(state => state - 1)} border="1px solid" borderColor="gray.200" borderRadius="md" >
                        <ChevronLeftIcon color="gray.400" fontSize="lg" />
                    </Square>}

                    <Square size="9" bg="white" border="1px solid" borderColor="gray.200" borderRadius="md" >
                        {initialIndex + 1}
                    </Square>

                    {wishes.length === 5 && <Square size="9" cursor="pointer" onClick={()=>setInitialIndex(state => state + 1)} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md" >
                        <ChevronRightIcon color="gray.400" fontSize="lg" />
                    </Square>}
                </HStack>
            </Flex>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Desejo</DrawerHeader>

                <DrawerBody>
                    <Input value={wishUpdate?.name} type="text" onChange={(e)=>setWishUpdate({...wishUpdate, name: e.target.value})} placeholder='Nome' mb="3" />
                    <Textarea value={wishUpdate?.link} onChange={(e)=>setWishUpdate({...wishUpdate, link: e.target.value})} placeholder='Link' mb="3" />
                    <Select value={wishUpdate?.type_id} onChange={(e)=>setWishUpdate({...wishUpdate, type_id: Number(e.target.value)})} placeholder='Tipo Desejo'>
                        <option value={1}>Games</option>
                        <option value={2}>Livros</option>
                        <option value={3}>Outros</option>
                    </Select>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='solid' colorScheme="red" mr={3} onClick={handleDeleteWish}>
                    Excluir
                    </Button>
                    <Button colorScheme='blue' onClick={handleUpdateWish}>Salvar</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Drawer
                isOpen={openCreate}
                placement='right'
                onClose={closeCreate}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Criar Desejo</DrawerHeader>

                <DrawerBody>
                    <Input value={wishCreate?.name} type="text" onChange={(e)=>setWishCreate({...wishCreate, name: e.target.value})} placeholder='Nome' mb="3" />
                    <Textarea value={wishCreate?.link} onChange={(e)=>setWishCreate({...wishCreate, link: e.target.value})} placeholder='Link' mb="3" />
                    <Select value={wishCreate?.type_id} onChange={(e)=>setWishCreate({...wishCreate, type_id: Number(e.target.value)})} placeholder='Tipo Desejo'>
                        <option value={1}>Games</option>
                        <option value={2}>Livros</option>
                        <option value={3}>Outros</option>
                    </Select>
                </DrawerBody>

                <DrawerFooter>
                    <Button onClick={handleCreateWish} colorScheme='blue'>Criar</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    );
}