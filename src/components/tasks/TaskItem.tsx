import { ListItem, Card, CardBody, Flex, Avatar, Tag, Text, Button, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Input, Select, Textarea, VStack, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsListTask } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import Task from "../../types/Tasks";
import tasks from "../../supabase/finances";
import SubTask from "../../types/SubTasks";
import useTasksStore from "../../store/tasks";
import useFinancesStore from "../../store/finances";
import { CloseIcon } from "@chakra-ui/icons";

interface Props{
    name: string;
    id: number;
}

export default function TaskItem({name, id}: Props){

    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(0);
    const [checklist, setChecklist] = useState<SubTask[] | null>(null);
    const [checkedSubtaskLength, setCheckedSubtaskLength] = useState(0);
    const {changeStatus, fetchTasks, updateTask, checkSubtask, addSubTask, deleteTask, deleteSubTask} = useTasksStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [subtask, setSubtask] = useState("");
    const {fetchUser, avatar_url} = useFinancesStore();

    const taskById = async (id: number) => {

        setLoading(true);

        const { data: tasksData } = await tasks
            .from('tasks')
            .select(`*`)
            .eq('id', `${id}`)

        if(tasksData){
            setTask(tasksData[0]);

            setStatus(task?.status_id as number);

            setLoading(false);
        }
    }

    const handleDeleteTask = async () => {
        await deleteTask(task?.id as number);

        await fetchTasks();

        onClose();
    }

    const handleDeleteSubtask = async(id: number) => {
        await deleteSubTask(id);

        await checklistById(task?.id as number);
    }

    const handleAddSubTask = async () => {
        await addSubTask(task?.id as number, {name: subtask, isChecked: false});

        await checklistById(task?.id as number);
    }

    const handleCheckSubtask = async (subtaskId: number, isChecked: boolean, e: string) => {
        await checkSubtask(subtaskId, isChecked);

        await checklistById(id);

        return e;
    }

    const handleUpdate = async() => {
        await updateTask(id, task as Task);

        await fetchTasks();
    }

    const handleChangeStatus = async () => {
        await changeStatus(id, status);

        await fetchTasks();
    }

    const getCheckedSubtasksLength = () => {
        const subtasksChecked = checklist?.filter((item)=> item?.isChecked === true);
        
        setCheckedSubtaskLength(subtasksChecked?.length as number);
    }

    const checklistById = async(id: number) => {

        setLoading(true);

        const { data: subtasks } = await tasks
            .from('subtasks')
            .select(`*`)
            .eq('task_id', `${id}`)

        if(subtasks){
            setChecklist(subtasks);

            setLoading(false);
        }


    }

    useEffect(()=>{
        taskById(id);

        checklistById(id);

        fetchUser();

        console.log(loading);
    }, [])

    useEffect(()=>{
        handleChangeStatus();
    }, [status])

    useEffect(()=>{
        getCheckedSubtasksLength();
    }, [checklist]);

    return(
        <ListItem>
                    <Card  border="solid 1px" boxShadow="sm" borderColor="gray.200"  >
                        <CardBody py="3"  >
                            <Flex flexDirection="column" >
                                <Flex w="100%" justifyContent="space-between" >
                                    <Text fontSize="md" fontWeight="medium" mb="2" >{name}</Text>
                                    <HiDotsHorizontal onClick={onOpen} style={{cursor: "pointer"}} size={20} />
                                </Flex>
                                <Flex>
                                    <Avatar size="sm" mr="3" src={avatar_url} />
                                    <Tag border="1px solid" display="flex" bg="white" borderColor="gray.200" >
                                        <BsListTask  size={20} />
                                        <Text fontSize="sm" ml="2" color="gray.400" >{checkedSubtaskLength}/{checklist?.length}</Text>
                                    </Tag>
                                </Flex>
                            </Flex>
                        </CardBody>
                    </Card>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        onClose={onClose}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Task</DrawerHeader>

                        <DrawerBody>

                            <Input mb="2" value={task?.name} onChange={(e)=> setTask({...task, name: e.target.value} as Task)} />

                            <Textarea h="20%" mb="5" value={task?.description} onChange={(e)=> setTask({...task, description: e.target.value} as Task)} placeholder='Here is a sample placeholder' />

                                <Text fontSize="md" fontWeight="medium" mb="2" >Checklist</Text>

                                <VStack alignItems="flex-start" mb="5" >
                                    {checklist?.map((item)=>(
                                        <HStack w="100%" justifyContent="space-between" >
                                            <Checkbox key={item?.id} size='md' checked={item?.isChecked} isChecked={item?.isChecked} onChange={(e)=> handleCheckSubtask(item?.id, !item?.isChecked, e.target.value)} colorScheme='green'>
                                                {item?.name}
                                            </Checkbox>
                                            <CloseIcon h="0.7rem" w="0.7rem" onClick={()=>handleDeleteSubtask(item?.id)} cursor="pointer" />
                                        </HStack>
                                    ))}

                                    <HStack>
                                        <Input value={subtask} onChange={(e)=>setSubtask(e.target.value)} />
                                        <Button bg="green.500" color="white" onClick={handleAddSubTask} >Add</Button>
                                    </HStack>
                                </VStack>

                                <Text fontSize="md" fontWeight="medium" mb="2" >Mover Para:</Text>

                                <Select value={status} onChange={(e)=>setStatus(Number(e.target.value))} placeholder='Select option'>
                                    <option value={1}>Backlog</option>
                                    <option value={2}>In Progress</option>
                                    <option value={3}>Done</option>
                                </Select>

                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant='solid' colorScheme="red" mr={3} onClick={handleDeleteTask}>
                                Delete
                            </Button>
                            <Button onClick={handleUpdate} colorScheme='blue'>Save</Button>
                        </DrawerFooter>
                        </DrawerContent>
                    </Drawer>   
                </ListItem>
    );
}