import { Card, CardHeader, CardBody, CardFooter, Avatar, Tag, Text, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure, Textarea, Input, VStack, Checkbox, Select, HStack } from "@chakra-ui/react";
import { BsListTask } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Task from "../../types/Tasks";
import { useEffect, useState } from "react";
import tasks from "../../supabase/finances";
import SubTask from "../../types/SubTasks";
import useTasksStore from "../../store/tasks";
import useFinancesStore from "../../store/finances";
import { CloseIcon } from "@chakra-ui/icons";

interface Props{
    name: string;
    description: string;
    id: number;
}

export default function TaskCard({name, description, id}: Props){

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [task, setTask] = useState<Task | null>(null);
    const [checklist, setChecklist] = useState<SubTask[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [checkedSubtaskLength, setCheckedSubtaskLength] = useState(0);
    const [status, setStatus] = useState(0);
    const {changeStatus, fetchTasks, updateTask, checkSubtask, addSubTask, deleteTask, deleteSubTask} = useTasksStore();
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
        getCheckedSubtasksLength();
    }, [checklist]);

    useEffect(()=>{
        handleChangeStatus();
    }, [status])

    return(
        <Card w="100%" h="40%" bg="white" >
                    <CardHeader display="flex" alignItems="center" py="2" px="3" justifyContent="space-between" >
                        <Text fontSize="xl" fontWeight="medium"  >{name}</Text>
                        <HiOutlineDotsVertical style={{cursor: "pointer"}} onClick={onOpen} size={20} />
                    </CardHeader>
                    <CardBody px="3" pt="2" >
                        <Text fontSize="sm" color="gray.400" >
                            {description}
                        </Text>
                    </CardBody>
                    <CardFooter borderTop="solid 1px" py="2" display="flex" justifyContent="space-between" px="3" borderColor="gray.200" >
                        <Avatar name='Dan Abrahmov' size="sm" src={avatar_url} />
                        <Tag border="1px solid" display="flex" bg="white" borderColor="gray.200" >
                            <BsListTask size={20} />
                            <Text fontSize="sm" ml="2" color="gray.400" >{checkedSubtaskLength}/{checklist?.length}</Text>
                        </Tag>
                    </CardFooter>

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
        </Card>
    )
}