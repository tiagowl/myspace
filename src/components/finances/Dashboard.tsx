import { HStack, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";
import { FinancesContext } from "../../contexts/Finances";

export default function FinancesDashboard(){

    const {remainingSalary, totalExpenses, totalSavings} = useContext(FinancesContext);


    const cardDashboardStyles = {
        card:{
            w: "20rem",
            border: "1px solid",
            borderColor: "gray.200",
        },
        title:{
            fontSize: "sm"
        },
        value:{
            fontSize: "3xl"
        }
    }

    return(
        <HStack>
                        <Card {...cardDashboardStyles.card} >
                            <CardBody>
                                <Flex justifyContent="space-between" >
                                    <Flex flexDirection="column" >
                                        <Text {...cardDashboardStyles.title} >Salário Restante</Text>
                                        <Text {...cardDashboardStyles.value} >{remainingSalary}</Text>
                                    </Flex>
                                    <IoNewspaperOutline size={25} />
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card {...cardDashboardStyles.card} >
                            <CardBody>
                                <Flex justifyContent="space-between" >
                                    <Flex flexDirection="column" >
                                        <Text {...cardDashboardStyles.title} >Total Gastos</Text>
                                        <Text {...cardDashboardStyles.value} >{totalExpenses}</Text>
                                    </Flex>
                                    <RiMoneyEuroCircleFill size={25} />
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card {...cardDashboardStyles.card} >
                            <CardBody>
                                <Flex justifyContent="space-between" >
                                    <Flex flexDirection="column" >
                                        <Text {...cardDashboardStyles.title} >Total Poupança</Text>
                                        <Text {...cardDashboardStyles.value} >{totalSavings}</Text>
                                    </Flex>
                                    <TbPigMoney size={25} />
                                </Flex>
                            </CardBody>
                        </Card>
                    </HStack>
    )
}