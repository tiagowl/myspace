import { AddIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import useGymStore from "../store/gym";
import { useEffect, useState } from "react";
import Workouts from "../types/Workouts";

export default function Gym(){

    const {fetchWorkouts, workoutsA, workoutsB, workoutsC, workouts, updateWorkout, createWorkout, deleteWorkout} = useGymStore();
    const [workoutId, setWorkoutId] = useState(0);
    const [workoutUpdate, setWorkoutUpdate] = useState<Workouts | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [WorkoutCreate, setWorkoutCreate] = useState<Workouts | null>(null);
    const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();

    const handleCreateWorkout = async () => {
        await createWorkout(WorkoutCreate as Partial<Workouts>);

        await fetchWorkouts();

        onCloseCreate();
    }

    const handleDeleteWorkout = async () => {
        await deleteWorkout(workoutId);

        await fetchWorkouts();

        onClose();
    }


    const handleUpdateWorkout = async () => {

        await updateWorkout(workoutId, workoutUpdate as Partial<Workouts>);

        await fetchWorkouts();

        onClose();

    }

    useEffect(()=>{
        const workoutById = workouts?.find((item)=> item.id === workoutId);

        setWorkoutUpdate(workoutById as Workouts);

        onOpen();
    }, [workoutId])

    useEffect(()=>{
        fetchWorkouts();
    }, [])

    return(
        <Flex w="100%" h="auto" flexDirection="column" p="5" >

            <Button leftIcon={<AddIcon/>} onClick={onOpenCreate} bg="green.500" w="28" color="white" mb="5" >Adicionar</Button>

            <VStack w="100%" spacing="5" >
                <TableContainer w="100%" border="1.5px solid" borderRadius="lg" borderColor="gray.300" >
                    <Table variant='simple' >
                    <TableCaption>Treino A</TableCaption>
                                    <Thead bg="gray.100" >
                                        <Tr>
                                            <Th>Exercício</Th>
                                            <Th>Repetições</Th>
                                            <Th isNumeric>Peso</Th>
                                            <Th>Series</Th>
                                            <Th>Dias treinados</Th>
                                            <Th>
                                                
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody bg="white" >
                                        {workoutsA()?.map((item, index)=>(
                                            <Tr key={index} >
                                                <Td fontSize="md" fontWeight="bold" >{item?.exercicie}</Td>
                                                <Td>{item?.repetitions}</Td>
                                                <Td isNumeric>{item?.wheight}</Td>
                                                <Td>{item?.series}</Td>
                                                <Td>{item?.trainingsDays}</Td>
                                                <Td cursor="pointer" onClick={()=>setWorkoutId(item?.id)} ><PiDotsSixVerticalBold/></Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                    </Table>
                </TableContainer>

                <TableContainer w="100%" border="1.5px solid" borderRadius="lg" borderColor="gray.300" >
                    <Table variant='simple' >
                    <TableCaption>Treino B</TableCaption>
                                    <Thead bg="gray.100" >
                                        <Tr>
                                            <Th>Exercício</Th>
                                            <Th>Repetições</Th>
                                            <Th isNumeric>Peso</Th>
                                            <Th>Series</Th>
                                            <Th>Dias treinados</Th>
                                            <Th>
                                                
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody bg="white" >
                                        {workoutsB()?.map((item, index)=>(
                                            <Tr key={index} >
                                                <Td fontSize="md" fontWeight="bold" >{item?.exercicie}</Td>
                                                <Td>{item?.repetitions}</Td>
                                                <Td isNumeric>{item?.wheight}</Td>
                                                <Td>{item?.series}</Td>
                                                <Td>{item?.trainingsDays}</Td>
                                                <Td cursor="pointer" onClick={()=>setWorkoutId(item?.id)} ><PiDotsSixVerticalBold/></Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                    </Table>
                </TableContainer>

                <TableContainer w="100%" border="1.5px solid" borderRadius="lg" borderColor="gray.300" >
                    <Table variant='simple' >
                    <TableCaption>Treino C</TableCaption>
                                    <Thead bg="gray.100" >
                                        <Tr>
                                            <Th>Exercício</Th>
                                            <Th>Repetições</Th>
                                            <Th isNumeric>Peso</Th>
                                            <Th>Series</Th>
                                            <Th>Dias treinados</Th>
                                            <Th>
                                                
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody bg="white" >
                                        {workoutsC()?.map((item, index)=>(
                                            <Tr key={index} >
                                                <Td fontSize="md" fontWeight="bold" >{item?.exercicie}</Td>
                                                <Td>{item?.repetitions}</Td>
                                                <Td isNumeric>{item?.wheight}</Td>
                                                <Td>{item?.series}</Td>
                                                <Td>{item?.trainingsDays}</Td>
                                                <Td cursor="pointer" onClick={()=>setWorkoutId(item?.id)} ><PiDotsSixVerticalBold/></Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                    </Table>
                </TableContainer>   
            </VStack>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Treino</DrawerHeader>

                <DrawerBody>
                    <VStack w="100%" spacing="4" >

                        <FormControl>
                            <FormLabel>Treino</FormLabel>
                            <Input value={workoutUpdate?.exercicie} type="text" onChange={(e)=>setWorkoutUpdate({...workoutUpdate, exercicie: e.target.value} as Workouts)} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Repetições</FormLabel>
                            <NumberInput w="100%" value={workoutUpdate?.repetitions} onChange={(e)=>setWorkoutUpdate({...workoutUpdate, repetitions: Number(e)} as Workouts)} >
                                <NumberInputField  />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Peso</FormLabel>
                            <NumberInput w="100%" value={workoutUpdate?.wheight} onChange={(e)=>setWorkoutUpdate({...workoutUpdate, wheight: Number(e)} as Workouts)} >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Séries</FormLabel>
                            <NumberInput w="100%" value={workoutUpdate?.series} onChange={(e)=>setWorkoutUpdate({...workoutUpdate, series: Number(e)} as Workouts)} >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Dias Treinados</FormLabel>
                            <NumberInput w="100%" value={workoutUpdate?.trainingsDays} onChange={(e)=>setWorkoutUpdate({...workoutUpdate, trainingsDays: Number(e)} as Workouts)} >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Serie</FormLabel>
                            <Select value={workoutUpdate?.serie_id} onChange={(e)=>setWorkoutUpdate({...workoutUpdate, serie_id: Number(e.target.value)} as Workouts)}  placeholder='Serie'>
                                <option value={1}>A</option>
                                <option value={2}>B</option>
                                <option value={3}>C</option>
                            </Select>
                        </FormControl>                    
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='solid' colorScheme="red" mr={3} onClick={handleDeleteWorkout}>
                    Excluir
                    </Button>
                    <Button colorScheme='blue' onClick={handleUpdateWorkout}>Salvar</Button>
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
                <DrawerHeader>Treino</DrawerHeader>

                <DrawerBody>
                    <VStack w="100%" spacing="4" >

                        <FormControl>
                            <FormLabel>Treino</FormLabel>
                            <Input value={WorkoutCreate?.exercicie} type="text" onChange={(e)=>setWorkoutCreate({...WorkoutCreate, exercicie: e.target.value} as Workouts)} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Repetições</FormLabel>
                            <NumberInput w="100%" value={WorkoutCreate?.repetitions} onChange={(e)=>setWorkoutCreate({...WorkoutCreate, repetitions: Number(e)} as Workouts)} >
                                <NumberInputField  />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Peso</FormLabel>
                            <NumberInput w="100%" value={WorkoutCreate?.wheight} onChange={(e)=>setWorkoutCreate({...WorkoutCreate, wheight: Number(e)} as Workouts)} >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Séries</FormLabel>
                            <NumberInput w="100%" value={WorkoutCreate?.series} onChange={(e)=>setWorkoutCreate({...WorkoutCreate, series: Number(e)} as Workouts)} >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Dias Treinados</FormLabel>
                            <NumberInput w="100%" value={WorkoutCreate?.trainingsDays} onChange={(e)=>setWorkoutCreate({...WorkoutCreate, trainingsDays: Number(e)} as Workouts)} >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Serie</FormLabel>
                            <Select value={WorkoutCreate?.serie_id} onChange={(e)=>setWorkoutCreate({...WorkoutCreate, serie_id: Number(e.target.value)} as Workouts)}  placeholder='Serie'>
                                <option value={1}>A</option>
                                <option value={2}>B</option>
                                <option value={3}>C</option>
                            </Select>
                        </FormControl>                    
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button colorScheme='blue' onClick={handleCreateWorkout}>Criar</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}