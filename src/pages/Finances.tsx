import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import FinancesDashboard from "../components/finances/Dashboard";
import Expenses from "../components/finances/Expenses";
import Savings from "../components/finances/Savings";

export default function Finances(){

    return(
        <Tabs bg="white" h="100%" >
            <TabList px="4" bg="white" borderBottom="1px solid" borderBottomColor="gray.100" >
                <Tab>Dashboard</Tab>
                <Tab>Gastos</Tab>
                <Tab>Poupanças</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <FinancesDashboard/>
                </TabPanel>
                <TabPanel>
                    <Expenses/>
                </TabPanel>
                <TabPanel>
                    <Savings/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}