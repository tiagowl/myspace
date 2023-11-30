import { Avatar, Button, Flex, Input, InputGroup, InputRightAddon, Spinner, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import useFinancesStore from "../store/finances";
import { User } from "../types/Users";
import { useEffect, useState } from "react";

export default function Profile(){

    const {fetchUser, user, updateUser, loading, avatar_url} = useFinancesStore();
    const [userInfo, setUserInfo] = useState<User | null>();

    const fetchInfo = async () => {
        await fetchUser();

        setUserInfo(user);
    }

    useEffect(()=>{
        fetchInfo();
    }, [])

    useEffect(()=>{
        const strArr = userInfo?.email?.split("@");

        if(strArr !== undefined){
            setUserInfo({...userInfo, email: strArr[0]} as User)
        }
        
    },[userInfo])

    const handleUpdate = async () => {
        await updateUser(userInfo as User, 2);

        await fetchUser();
    }

    const handleCancel = async() => {
        await fetchUser();

        const strArr = user?.email?.split("@");

        if(strArr !== undefined){
            setUserInfo({...user, email: strArr[0]} as User)
        }
    }

    return(
        <Flex w="100%" h="100%" >
            <Sidebar/>
            <Flex w="100%" flexDirection="column" bg="white" h="100%" >
                <Navbar/>
                <Flex w="100%" h="36" bg="gray.100" >
                
                </Flex>
                <Avatar src={avatar_url} size="2xl" position="absolute" top="12rem" left="19rem" border="2.5px solid white" boxShadow="lg" />
                <Flex w="100%" h="100%" mb="5rem" >
                    <Text fontSize="2xl" fontWeight="medium" mt="5" ml="11rem" >{userInfo?.name}</Text>
                </Flex>
                {loading ? <Spinner m="0 auto" /> : <>
                <Flex w="100%" h="100%" flexDirection="row" alignItems="flex-end" justifyContent="space-between" pb="5" px="2.3rem" borderBottom="1px solid" borderBottomColor="gray.200" >
                    <Flex flexDirection="column" >
                        <Text fontSize="xl" fontWeight="medium">Configurações Perfil</Text>
                        <Text fontSize="sm" color="gray.500" >Edite sua foto e mais detalhes aqui.</Text>
                    </Flex>
                    <Flex>
                        <Button bg="white" border="1px solid" onClick={handleCancel} borderColor="gray.300" >Cancelar</Button>
                        <Button bg="blackAlpha.900" ml="3" onClick={handleUpdate} color="white" fontSize="sm" fontWeight="medium" >Salvar Alterações</Button>
                    </Flex>
                </Flex>
                <Flex w="100%" h="100%" flexDirection="row" alignItems="flex-start" py="5" px="2.3rem" borderBottom="1px solid" borderBottomColor="gray.200" >
                    <Flex flexDirection="column" mr="13.8rem" >
                        <Text fontSize="xl" fontWeight="medium">Perfil Credenciais</Text>
                        <Text fontSize="sm" color="gray.500" >Será suas informações de exibição</Text>
                    </Flex>
                    <Flex flexDirection="column" w="25rem" >
                        <Input mb="3" value={userInfo?.name} onChange={(e)=>setUserInfo({...userInfo, name: e.target.value} as User)} />
                        <InputGroup w="25rem" size='md'>
                            <Input value={userInfo?.email} onChange={(e)=>setUserInfo({...userInfo, email: `${e.target.value}@gmail.com`} as User)} placeholder='Email' />
                            <InputRightAddon fontSize="sm" children='@gmail.com' />
                        </InputGroup>
                    </Flex>
                    
                </Flex>
                <Flex w="100%" h="100%" flexDirection="row" alignItems="center" py="5" px="2.3rem" borderBottom="1px solid" borderBottomColor="gray.200" >
                    <Flex flexDirection="column" mr="10rem" >
                        <Text fontSize="xl" fontWeight="medium">Perfil Valores</Text>
                        <Text fontSize="sm" color="gray.500" >Será suas informações em relação ao salário</Text>
                    </Flex>
                    <Flex flexDirection="column" w="25rem" >
                        <Input mb="3" value={userInfo?.salary} onChange={(e)=>setUserInfo({...userInfo, salary: Number(e.target.value)} as User)} />
                    </Flex>
                    
                </Flex>
                </>
                }
            </Flex>
        </Flex>
    );
}