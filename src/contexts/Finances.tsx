import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/Users";
import { Expense } from "../types/Expenses";
import { Savings } from "../types/Savings";
import finances from "../supabase/finances";

type FinancesProviderProps = {
    user: User;
    expenses: Expense[];
    savings: Savings[];
    fetchSavings: ()=> Promise<void>;
    fetchExpenses: ()=>Promise<void>;
    fetchUser: ()=>Promise<void>;
    loading: boolean;
    remainingSalary: number;
    totalExpenses: number;
    totalSavings: number;
}

interface Props{
    children?: ReactNode
}

export const FinancesContext = createContext<FinancesProviderProps>({
    user: {} as User,
    expenses: [],
    savings: [],
    async fetchSavings() {
        return await fetch("").then((response) => {
            return response.json();
        })
        .then(() => {
            
        })
    },
    async fetchExpenses() {
        return await fetch("").then((response) => {
            return response.json();
        })
        .then(() => {
            
        })
    },
    async fetchUser() {
        return await fetch("").then((response) => {
            return response.json();
        })
        .then(() => {
            
        })
    },
    loading: false,
    remainingSalary: 0,
    totalExpenses: 0,
    totalSavings: 0
})

export const FinancesProvider = (props: Props) => {

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [savings, setSavings] = useState<Savings[]>([]);
    const [loading, setLoading] = useState(false);
    const [remainingSalary, setRemainingSalary] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [user, setUser] = useState<User>({} as User)

    useEffect(()=>{

        const apiCall = [
            fetchUser(),
            fetchExpenses(),
            fetchSavings()
        ]

        Promise.all(apiCall).then(()=>{
            setRemainingSalary(user.salary - totalExpenses - totalSavings);
            console.log(remainingSalary);
        })

    }, [])

    const fetchExpenses = async() => {
        setLoading(true);

        const { data: expenses } = await finances
            .from('expenses')
            .select('*');

        if(expenses !== undefined){
            setExpenses(expenses as Expense[]);
            setLoading(false);
            setTotalExpenses(TotalExpenses());
            console.log(totalExpenses);
            console.log(expenses)
        }
    }

    const fetchSavings = async() => {
        setLoading(true);

        const { data: savings } = await finances
            .from('savings')
            .select('*');

        if(savings !== undefined){
            setSavings(savings as Savings[]);
            setTotalSavings(TotalSavings());
            console.log(TotalSavings());
            setLoading(false);
            console.log(totalSavings);
            console.log(savings);
        }
    }

    const fetchUser = async() => {

        setLoading(true);

        const { data: users } = await finances
            .from('users')
            .select('*')

        if(users){
            setUser(users[0]);
            setLoading(false)
            console.log(user);
        }
    }

    const TotalExpenses = () => {
        const prices = expenses?.map((item)=>item.price);
        console.log(prices);
        const total = prices.reduce((acumulador, numero) => acumulador + numero, 0);
        console.log(total);
        return total;
    }

    const TotalSavings = () => {
        const savingsPrices = savings?.map((item)=>item.expense);
        console.log(savingsPrices)
        const total = savingsPrices.reduce((acumulador, numero) => acumulador + numero, 0);
        console.log(total);
        return total;
    }

    return (
        <FinancesContext.Provider value={{expenses,savings,loading,fetchExpenses,fetchSavings,remainingSalary,totalExpenses,totalSavings,user,fetchUser}} >
            {props.children}
        </FinancesContext.Provider>
    )

}