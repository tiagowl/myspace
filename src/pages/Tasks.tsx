import { Tabs, TabList, Tab, Text, TabPanels, TabPanel, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Textarea, VStack, HStack, Checkbox, Select } from "@chakra-ui/react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdFormatListBulleted } from "react-icons/md";
import TaskList from "../components/tasks/TaskList";
import Kanbam from "../components/tasks/Kanbam";
import { AddIcon } from "@chakra-ui/icons";
import SubTask from "../types/SubTasks";
import { useState } from "react";
import Task from "../types/Tasks";
import useTasksStore from "../store/tasks";


export default function Tasks(){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [checklist, setChecklist] = useState<Array<Partial<SubTask>>>([]);
    const [name, setName] = useState("");
    const [task, setTask] = useState<Partial<Task> | null>({description: "", name: "", status_id: 0});
    const {createTask, fetchTasks} = useTasksStore();

    const handleAddSubtask = () => {
        setChecklist([...checklist, {name: name, isChecked: false}]);
    }

    const handleCreateTask = async () => {
        await createTask(task as Partial<Task>, checklist);

        await fetchTasks();

        onClose();
    }

    

    return(
        <Tabs bg="white" h="100%" >
            <TabList px="4" bg="white" borderBottom="1px solid" borderBottomColor="gray.100" >
                <Tab><HiOutlineSquares2X2 size={25}/></Tab>
                <Tab><MdFormatListBulleted size={25} /></Tab>
            </TabList>

            <TabPanels  >
                <TabPanel bg="gray.100" minH="70vh" maxH="auto" >
                    <Button onClick={onOpen} leftIcon={<AddIcon/>} bg="green.500" mb="3" color="white" >Adicionar</Button>
                    <Kanbam/>
                </TabPanel>
                <TabPanel bg="white" minH="100%" >
                    <Button onClick={onOpen} leftIcon={<AddIcon/>} bg="green.500" mb="3" color="white" >Adicionar</Button>
                    <TaskList/>
                </TabPanel>
            </TabPanels>

            <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create Task</DrawerHeader>

                <DrawerBody>
                    <Input mb="2" value={task?.name} onChange={(e)=>setTask({...task, name: e.target.value})} placeholder="Nome"/>

                    <Textarea value={task?.description} onChange={(e)=>setTask({...task, description: e.target.value})} h="20%" mb="5" placeholder="Descrição" />

                    <Text fontSize="md" fontWeight="medium" mb="2" >Checklist</Text>

                    <VStack alignItems="flex-start" mb="5" >

                        {checklist.map((item, index)=>(
                            <Checkbox key={index} size='md' colorScheme='green' >
                                {item.name}
                            </Checkbox>
                        ))}


                        <HStack>
                            <Input value={name} onChange={(e)=>setName(e.target.value)} />
                            <Button onClick={handleAddSubtask} bg="green.500" color="white">Add</Button>
                        </HStack>

                        <Text fontSize="md" fontWeight="medium" mb="2" >Mover Para:</Text>

                        <Select value={task?.status_id} onChange={(e)=>setTask({...task, status_id: Number(e.target.value)})} placeholder='Select option'>
                                    <option value={1}>Backlog</option>
                                    <option value={2}>In Progress</option>
                                    <option value={3}>Done</option>
                        </Select>
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                    </Button>
                    <Button colorScheme='blue' onClick={handleCreateTask}>Save</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Tabs>
    )
}