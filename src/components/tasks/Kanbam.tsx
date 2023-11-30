import { HStack } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import Status from "./Status";
import useTasksStore from "../../store/tasks";
import { useEffect } from "react";

export default function Kanbam(){

    const {fetchTasks, backlogTasks, inProgressTasks, doneTasks} = useTasksStore();

    useEffect(()=>{
        fetchTasks();
    }, [])

    return (
        <HStack spacing="5" w="100%" alignItems="flex-start" >
            <Status name="Backlog" statusId={1} colorCircle="orange" numOfTasks={backlogTasks.length} >
                {backlogTasks.map((item)=>(
                    <TaskCard name={item.name} description={item.description} id={item.id} />
                ))}
            </Status>
            <Status name="In Progress" statusId={2} colorCircle="blue" numOfTasks={inProgressTasks.length} >
                {inProgressTasks.map((item)=>(
                    <TaskCard name={item.name} description={item.description} id={item.id} />
                ))}
            </Status>
            <Status name="Done" statusId={3} colorCircle="green" numOfTasks={doneTasks.length} >
                {doneTasks.map((item)=>(
                    <TaskCard name={item.name} description={item.description} id={item.id} />
                ))}
            </Status>
        </HStack>
    )
}