import SubTask from "./SubTasks";

export default interface Task{
    id: number;
    created_at: Date;
    name: string;
    description: string;
    status_id: number;
    subtasks: SubTask[];
}