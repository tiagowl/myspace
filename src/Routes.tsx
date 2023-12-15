import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Finances from "./pages/Finances";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Wishes from "./pages/Wishes";
import Gym from "./pages/Gym";

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>} >
                    <Route index element={<Finances/>} />
                    <Route path="/tasks" element={<Tasks/>} />
                    <Route path="/wishes" element={<Wishes/>} />
                    <Route path="/gym" element={<Gym/>} />
                </Route>
                <Route path="/profile" element={<Profile/>} />
                
            </Routes>
        </BrowserRouter>
    )
}