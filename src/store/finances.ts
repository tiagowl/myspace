import { create } from "zustand";
import { Expense } from "../types/Expenses";
import { Savings } from "../types/Savings";
import { User } from "../types/Users";
import finances from "../supabase/finances";

interface FinancesState{
    savings: Savings[],
    expenses: Expense[],
    user: User,
    avatar_url: string;
    fetchUser: ()=>Promise<void>,
    fetchSavings: ()=>Promise<void>,
    fetchExpenses: ()=>Promise<void>,
    totalSavings: ()=> number;
    totalExpenses: ()=>number;
    remainingSalary: ()=>number;
    loading: boolean;
    updateExpense: (Expense: Expense, id: number)=>Promise<void>;
    deleteExpense: (id: number)=>Promise<void>;
    createExpense: (expense: Partial<Expense>)=>Promise<void>;
    updateSaving: (saving: Partial<Savings>, id: number)=>Promise<void>;
    updateUser: (user: Partial<User>, id: number)=>Promise<void>;
    featchCreateSaving: (saving: Partial<Savings>)=>Promise<void>;
    deleteSaving: (id: number)=>Promise<void>;
}

const useFinancesStore = create<FinancesState>((set, get)=>({
    savings: [],
    expenses: [],
    avatar_url: "",
    user: {
        id: 0,
        email: "",
        salary: 0,
        income: 0,
        name: "",
        avatar_url: ""
    },
    totalSavings: () => {
        const savingsValues = get().savings;

        const savingsPrice = savingsValues.map((item)=>item.expense);

        const savingsTotal = savingsPrice.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);

        return savingsTotal;
    },
    totalExpenses:() => {
        const expensesValues = get().expenses;

        const savingsPrice = expensesValues.map((item)=>item.price);

        const savingsTotal = savingsPrice.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);

        return savingsTotal;
    },
    remainingSalary: () => {
        const totalSalary = get().user.salary - get().totalExpenses() - get().totalSavings();

        return totalSalary;
    },
    loading: false,
    fetchUser: async() => {

        set({loading: true});

        const { data: users } = await finances
        .from('users')
        .select('*')

        if(users){
            set({user: users[0], loading: false, avatar_url: users[0].avatar_url});
        }
    },
    fetchSavings: async() => {

        set({loading: true});

        const { data: savings } = await finances
        .from('savings')
        .select('*')

        if(savings){
            set({savings: savings, loading: false})
        }
    },
    fetchExpenses: async() => {

        set({loading: true});

        const { data: expenses } = await finances
        .from('expenses')
        .select('*')

        if(expenses){
            set({expenses: expenses, loading: false})
        }
    },
    updateExpense: async (Expense: Expense, id: number) => {

        set({loading: true})
        
        const { data } = await finances
            .from('expenses')
            .update(Expense)
            .eq('id', `${id}`);

        if(data){
            set({loading: false});
        }

    },
    updateSaving: async (saving, id) => {
        set({loading: true});

        const { data } = await finances
            .from('savings')
            .update(saving)
            .eq('id', `${id}`);

        if(data){
            set({loading: false});
        }
    },
    updateUser: async (user, id) => {
        set({loading: true});

        const { data } = await finances
            .from('users')
            .update(user)
            .eq('id', `${id}`);

        if(data){
            set({loading: false});
        }
    },
    deleteExpense: async (id: number) => {

        set({loading: true})

        const { error } = await finances
            .from('expenses')
            .delete()
            .eq('id', `${id}`);

        if(!error){
            set({loading: false})
        }
    },
    deleteSaving: async (id) => {
        set({loading: true})

        const { error } = await finances
            .from('savings')
            .delete()
            .eq('id', `${id}`);

        if(!error){
            set({loading: false})
        }
    },
    createExpense: async (expense) => {

        set({loading: true});

        const { data } = await finances
              .from('expenses')
              .insert([
                    expense,
               ])
        
        if(data){
            set({loading: false});
        }
    },
    featchCreateSaving: async (saving) => {
        set({loading: true});

        const { data } = await finances
              .from('savings')
              .insert([
                    saving,
               ])
        
        if(data){
            set({loading: false});
        }
    },
}));

export default useFinancesStore;