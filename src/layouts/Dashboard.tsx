import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageInfo from "../components/PageInfo";

export default function Dashboard(){
    return(
        <Flex w="100%" h="100%" >
            <Sidebar/>
            <Flex w="100%" h="100vh" flexDirection="column" bg="gray.50" >
                <Navbar/>
                <PageInfo/>
                <Outlet/>
            </Flex>
        </Flex>
    )
}