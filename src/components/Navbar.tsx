import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Square, InputGroup, InputLeftElement, Input, Text } from "@chakra-ui/react";
import { FaCalendarDays } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { LuSquareStack } from "react-icons/lu";
import { MdNotificationsNone } from "react-icons/md";
import { PiSquaresFour } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function Navbar(){

    const navigate = useNavigate();

    return(
        <Flex w="100%" bg="white" alignItems="center" px="4" justifyContent="space-between" py="5" borderBottom="1px solid" borderBottomColor="gray.100" >
                    <Flex mr="7" >
                        <Square size="10" mr="4" borderRadius="md" border="1px solid" borderColor="gray.100" >
                            <PiSquaresFour size={25} color="#959393" />
                        </Square>

                        <Square size="10" mr="4" borderRadius="md" border="1px solid" borderColor="gray.100" >
                            <LuSquareStack size={20} color="#959393" />
                        </Square>

                        <Square size="10" mr="4" borderRadius="md" border="1px solid" borderColor="gray.100" >
                            <HiOutlineSquaresPlus size={20} color="#959393" />
                        </Square>
                    </Flex>
                    <Flex mr="10" >
                        <FaCalendarDays size={20} color="#959393" />
                        <Text w="8rem" color="gray.500" ml="3" fontSize="sm" fontWeight="medium" >14 October 2023</Text>
                    </Flex>
                    <InputGroup mr="10" >
                        <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='blackAlpha.800' />
                        </InputLeftElement>
                        <Input  type='tel' placeholder='Phone number' />
                    </InputGroup>
                    <Flex alignItems="center" >
                        <MdNotificationsNone style={{marginRight: "0.9rem"}} size={25} color={"#000"} />
                        <FiSettings onClick={()=>navigate("/profile")} style={{cursor: "pointer"}}  size={20} color={"#000"} />
                    </Flex>
        </Flex>
    )
}