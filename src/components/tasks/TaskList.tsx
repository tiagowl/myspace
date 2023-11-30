import { Flex, List, Text } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import useTasksStore from "../../store/tasks";
import { useEffect } from "react";

export default function TaskList(){

    const {fetchTasks, backlogTasks, inProgressTasks, doneTasks} = useTasksStore();

    useEffect(()=>{
        fetchTasks();
    }, [])


    return(
        <Flex flexDirection="column" >
            <Flex alignItems="center" mb="2" >
                <Text fontSize="xl" fontWeight="medium" mr="3" >Backlog</Text>    
                <Text fontSize="xs" mr="3" mt="1" color="gray.500" >{backlogTasks.length} Tasks</Text>
                
            </Flex>

            <List spacing="2" >
                {backlogTasks.map((item)=>(
                    <TaskItem name={item?.name} id={item?.id} />
                ))}
            </List>

            <Flex alignItems="center" mt="4" mb="2" >
                <Text fontSize="xl" fontWeight="medium" mr="3" >In Progress</Text>    
                <Text fontSize="xs" mr="3" mt="1" color="gray.500" >{inProgressTasks.length} Tasks</Text>
                
            </Flex>

            <List spacing="2" >
                {inProgressTasks.map((item)=>(
                    <TaskItem name={item?.name} id={item?.id} />
                ))}
            </List>

            <Flex alignItems="center" mt="4" mb="2" >
                <Text fontSize="xl" fontWeight="medium" mr="3" >Done</Text>    
                <Text fontSize="xs" mr="3" mt="1" color="gray.500" >{doneTasks.length} Tasks</Text>
                
            </Flex>

            <List spacing="2" >
                {doneTasks.map((item)=>(
                    <TaskItem name={item?.name} id={item?.id} />
                ))}
            </List>
        </Flex>
    );
}