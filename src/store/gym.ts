import { create } from "zustand";
import Workouts from "../types/Workouts";
import gym from "../supabase/finances";

interface GymState{
    workouts: Workouts[];
    workoutsA: ()=>Workouts[];
    workoutsB: ()=>Workouts[];
    workoutsC: ()=>Workouts[];
    fetchWorkouts: ()=>Promise<void>;
    updateWorkout: (id: number, workout: Partial<Workouts>)=>Promise<void>;
    createWorkout: (workout: Partial<Workouts>)=>Promise<void>;
    deleteWorkout: (id: number) => Promise<void>;
}

const useGymStore = create<GymState>((set, get)=>({
    workouts: [],
    workoutsA: () => {
        const workouts = get().workouts;

        const workoutsA = workouts.filter((item)=> item.serie_id === 1);

        return workoutsA;
    },
    workoutsB: () => {
        const workouts = get().workouts;

        const workoutsB = workouts.filter((item)=> item.serie_id === 2);

        return workoutsB;
    },
    workoutsC: () => {
        const workouts = get().workouts;

        const workoutsC = workouts.filter((item)=> item.serie_id === 3);

        return workoutsC;
    },
    fetchWorkouts: async () => {
        const { data: workouts } = await gym
        .from('workouts')
        .select('*')

        if(workouts){
            set({workouts: workouts});
        }
    },
    updateWorkout: async(id, workout) => {
        await gym
        .from('workouts')
        .update(workout)
        .eq('id', `${id}`);
    },
    createWorkout: async (workout) => {
        await gym
        .from('workouts')
        .insert([
            workout,
        ])
    },
    deleteWorkout: async (id) => {
         await gym
        .from('workouts')
        .delete()
        .eq('id', `${id}`);
    },
}));

export default useGymStore;