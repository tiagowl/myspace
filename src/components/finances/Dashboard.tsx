import { HStack, Card, CardBody, Flex, Text, Stack, Skeleton } from "@chakra-ui/react";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";
import useFinancesStore from "../../store/finances";
import { useEffect } from "react";

export default function FinancesDashboard(){

    const {remainingSalary, totalExpenses, totalSavings, fetchUser, fetchExpenses, fetchSavings, loading} = useFinancesStore();

    useEffect(()=>{
        fetchUser();
        fetchExpenses();
        fetchSavings();
    }, [])


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
                                {loading ? 
                                    <Stack>
                                        <Skeleton height='20px' width="50px" />
                                        <Skeleton height='20px' />
                                        <Skeleton height='20px' />
                                    </Stack> : 
                                    <Flex justifyContent="space-between" >
                                        <Flex flexDirection="column" >
                                            <Text {...cardDashboardStyles.title} >Salário Restante</Text>
                                            <Text {...cardDashboardStyles.value} >{remainingSalary()}</Text>
                                        </Flex>
                                        <IoNewspaperOutline size={25} />
                                    </Flex>
                                }
                            </CardBody>
                        </Card>
                        <Card {...cardDashboardStyles.card} >
                        <CardBody>
                            {loading ? 
                                        <Stack>
                                            <Skeleton height='20px' width="50px" />
                                            <Skeleton height='20px' />
                                            <Skeleton height='20px' />
                                        </Stack> : 
                                        <Flex justifyContent="space-between" >
                                            <Flex flexDirection="column" >
                                                <Text {...cardDashboardStyles.title} >Total Gastos</Text>
                                                <Text {...cardDashboardStyles.value} >{totalExpenses()}</Text>
                                            </Flex>
                                            <RiMoneyEuroCircleFill size={25} />
                                        </Flex>
                                }
                        </CardBody>
                        </Card>
                        <Card {...cardDashboardStyles.card} >
                            <CardBody>
                                {loading ? 
                                            <Stack>
                                                <Skeleton height='20px' width="50px" />
                                                <Skeleton height='20px' />
                                                <Skeleton height='20px' />
                                            </Stack> : 
                                            <Flex justifyContent="space-between" >
                                                <Flex flexDirection="column" >
                                                    <Text {...cardDashboardStyles.title} >Salário Poupança</Text>
                                                    <Text {...cardDashboardStyles.value} >{totalSavings()}</Text>
                                                </Flex>
                                                <TbPigMoney size={25} />
                                            </Flex>
                                        }
                            </CardBody>
                        </Card>
                    </HStack>
    )
}