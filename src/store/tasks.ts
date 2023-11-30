import { create } from "zustand";
import Task from "../types/Tasks";
import tasks from "../supabase/finances";
import SubTask from "../types/SubTasks";

interface TasksState{
    tasks: Task[];
    fetchTasks: ()=>Promise<void>;
    loading: boolean;
    backlogTasks: Task[];
    inProgressTasks:  Task[];
    doneTasks: Task[];
    changeStatus: (id: number, statusId: number) => Promise<void>;
    updateTask: (id: number, task: Partial<Task>) => Promise<void>;
    checkSubtask: (id: number, isChecked: boolean) => Promise<void>;
    addSubTask: (idTask: number, subtask: Partial<SubTask>) => Promise<void>;
    createTask: (task: Partial<Task>, subtask: Array<Partial<SubTask>>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    deleteSubTask: (id: number) => Promise<void>;
}

const useTasksStore = create<TasksState>((set)=>({
    tasks: [],
    backlogTasks: [],
    inProgressTasks: [],
    doneTasks:[],
    fetchTasks : async () => {
        set({loading: true});

        const { data: tasksData } = await tasks
            .from('tasks')
            .select(`
                *
            `)

        if(tasksData){

            const backTasks = tasksData.filter((item)=> item.status_id === 1);
            const progressTasks = tasksData.filter((item)=> item.status_id === 2);
            const doneTasks = tasksData.filter((item)=> item.status_id === 3);

            set({tasks: tasksData as Task[], loading: false, backlogTasks: backTasks, inProgressTasks: progressTasks, doneTasks: doneTasks});
        }

    },
    loading: false,
    changeStatus: async (id, statusId) => {
        
        set({loading: true});

        const { data: tasksData } = await tasks
        .from('tasks')
        .update({ status_id: `${statusId}` })
        .eq('id', `${id}`)

        if(tasksData){
            set({loading: false});
        }
    },
    updateTask: async(id, task) => {
        
        set({loading: true});

        const { data: tasksData } = await tasks
        .from('tasks')
        .update(task)
        .eq('id', `${id}`)

        if(tasksData){
            set({loading: false});
        }
    },
    checkSubtask: async (id, isChecked) => {
        set({loading: true});

        const { data: tasksData } = await tasks
        .from('subtasks')
        .update({isChecked: isChecked})
        .eq('id', `${id}`)

        if(tasksData){
            set({loading: false});
        }
    },
    addSubTask: async (idTask, subtask) => {
        set({loading: true});

        const { data } = await tasks
        .from('subtasks')
        .insert([
            {...subtask, task_id: idTask},
        ])

        if(data){
            set({loading: false});
        }
    },
    createTask: async (task, subtask) => {
        set({loading: true});

        const { data } = await tasks
            .from('tasks')
            .insert([
                task,
            ])
            .select()

        if(data){
            
            subtask.forEach((item, index)=> subtask[index].task_id = data[0].id);

            const { data: checklist } = await tasks
            .from('subtasks')
            .insert(subtask)
            .select()

            if(checklist){
                set({loading: false});
            }
        }
    },
    deleteTask: async (id) => {
        set({loading: true});

        const { error } = await tasks
        .from('tasks')
        .delete()
        .eq('id', `${id}`)

        const {error: ErrorSubtask} = await tasks
        .from('subtasks')
        .delete()
        .eq('task_id', `${id}`)

        if(!error || ErrorSubtask){
            set({loading: false});
        }
    },
    deleteSubTask: async (id) => {
        set({loading: true});

        const { error } = await tasks
        .from('subtasks')
        .delete()
        .eq('id', `${id}`)

        if(!error){
            set({loading: false});
        }
    },
}));

export default useTasksStore;