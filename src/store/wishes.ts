import { create } from "zustand";
import Wish from "../types/Wishes";
import Wishes from "../supabase/finances";

interface WishesState{
    wishes: Wish[];
    fetchWishes: (initial: number, final: number)=>Promise<void>;
    loading: boolean;
    updateWish: (id: number, wish: Partial<Wish>)=>Promise<void>;
    createWish: (wish: Partial<Wish>)=>Promise<void>;
    deleteWish: (id: number)=>Promise<void>;
    searchByName: (text: string)=>Promise<void>;
}

const useWishesStore = create<WishesState>((set)=>({
    loading: false,
    wishes: [],
    fetchWishes: async (initial, final) => {
        set({loading: true});

        const { data: wishesData } = await Wishes
        .from('wishes')
        .select('*')
        .range(initial, final);

        if(wishesData){
            set({loading: false, wishes: wishesData});
        }
    },
    updateWish: async (id, wish) => {
        set({loading: true});

        const { data } = await Wishes
        .from('wishes')
        .update(wish)
        .eq('id', `${id}`);

        if(data){
            set({loading: false});
        }
    },
    createWish: async (wish) => {
        set({loading: true});

        const { error } = await Wishes
        .from('wishes')
        .insert([
            wish,
        ])

        if(!error){
            set({loading: false});
        }
    },
    deleteWish: async (id) => {
        set({loading: true});

        const { error } = await Wishes
        .from('wishes')
        .delete()
        .eq('id', `${id}`)

        if(!error){
            set({loading: false});
        }
    },
    searchByName: async (text) => {

        set({loading: true});

        const { data: wishes,  } = await Wishes
        .from('wishes')
        .select("*")
        .ilike("name", `%${text}%`)

        if(wishes){
            set({loading: false, wishes: wishes});
        }
    },
}))

export default useWishesStore;