import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";

export default function PageInfo(){
    return(
        <Flex w="100%" px="4" flexDirection="column" py="4" bg="white" h="44" borderBottom="1px solid" borderBottomColor="gray.100" >
                    <Breadcrumb mb="5" >
                        <BreadcrumbItem color="gray.500" fontSize="sm" >
                            <BreadcrumbLink fontSize="sm" color="gray.500"  href='#'>Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem color="gray.500" fontSize="sm" >
                            <BreadcrumbLink fontSize="sm" color="gray.500" href='#'>Menu</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage fontSize="sm">
                            <BreadcrumbLink fontSize="sm" color="gray.500" href='#'>Finanças</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <Text fontSize="3xl" mb="5" fontWeight="semibold" >Finanças</Text>

                    <Text fontSize="md" fontWeight="thin" color="gray.400" >These projects encompass a diverse range of goals and industries</Text>
        </Flex>
    )
}