import { VStack, UnorderedList, ListItem, ListIcon, HStack, Text, Box } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { BsPencilFill } from 'react-icons/bs';
import { MdLocalPolice, MdLocalShipping } from 'react-icons/md';
import { useAccount } from '../contexts/Account';
import CoverageForm from './CoverageForm';
import PoolStats from './PoolStats';

const PoolBox: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <VStack w="full" align="start">
            <Text
                fontWeight="bold"
                fontSize="lg"
                bg="pink.500"
                px="5"
                py="1"
                w="full"
                color="white"
                mb="10px !important"
            >
                Package robbed policy
            </Text>

            <VStack w="full" align="start" mb="20px !important">
                <Text>This policy can be claimed if the package was robbed. Documentation: </Text>

                <UnorderedList spacing={3}>
                    <ListItem>
                        <ListIcon as={MdLocalPolice} color="pink.500" />
                        Verified penal claim. Downloadable file from official website.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdLocalShipping} color="pink.500" />
                        Valid carrier note. Downloadable file from official website.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={BsPencilFill} color="pink.500" />
                        Description of events.
                    </ListItem>
                </UnorderedList>
            </VStack>

            <HStack w="full" mb="20px !important" align="start">
                <PoolStats flex="1" mr="30px !important" />

                <Box flex="1" ml="30px !important">
                    {children}
                </Box>
            </HStack>
        </VStack>
    );
};

export const PoolCoverageBox = () => {
    const { connected } = useAccount();

    return <PoolBox>{connected && <CoverageForm />}</PoolBox>;
};

export const PoolSupplyBox = () => {
    return (
        <PoolBox>
            <Text>Supply box</Text>
        </PoolBox>
    );
};

export default PoolBox;
