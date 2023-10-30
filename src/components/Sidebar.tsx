import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Avatar, List, ListItem, ListIcon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {MdOutlinePriceChange} from "react-icons/md";
import {MdOutlineSpeakerNotes} from "react-icons/md";
import {FiStar} from "react-icons/fi";
import {CgGym} from "react-icons/cg";

export default function Sidebar(){

    const navigate = useNavigate();

    return(
        <Flex w="20rem" flexDirection="column" py="1rem" borderRight="1px solid" borderRightColor="gray.100" h="100vh" bg="white" >
                <Flex alignItems="center" cursor="pointer" onClick={()=>navigate("/profile")} px="2rem" borderBottom="1px solid" borderBottomColor="gray.100" pb="4" w="100%" justifyContent="space-between" >
                    <Avatar size="md" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    <Text fontWeight="medium" fontSize="md" color="black" >Dan Abramov</Text>
                    <Flex flexDirection="column" >
                        <ChevronUpIcon color="gray.400" />
                        <ChevronDownIcon color="gray.400" />
                    </Flex>
                </Flex>
                <Flex w="100%" flexDirection="column" px="2rem" py="4" >
                    <Text color="gray.500" fontSize="sm" fontWeight="medium" mb="5" >MENU</Text>

                    <List spacing={5}>
                        <ListItem fontSize="md" onClick={()=>navigate("/")} cursor="pointer" color="gray.500" >
                            <ListIcon as={MdOutlinePriceChange}  h="5" w="5" color='gray.500' />
                            Finanças
                        </ListItem>
                        <ListItem fontSize="md" color="gray.500" >
                            <ListIcon as={MdOutlineSpeakerNotes} color='gray.500' />
                            Tarefas
                        </ListItem>
                        <ListItem fontSize="md" color="gray.500" >
                            <ListIcon as={FiStar} color='gray.500' />
                            Desejos
                        </ListItem>
                        {/* You can also use custom icons from react-icons */}
                        <ListItem fontSize="md" color="gray.500" >
                            <ListIcon as={CgGym} color='gray.500' />
                            Academia
                        </ListItem>
                        </List>
                </Flex>
            </Flex>
    )
}