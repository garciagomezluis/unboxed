import {
    VStack,
    StatGroup,
    Stat,
    StatNumber,
    StatHelpText,
    Box,
    Progress,
    Text,
    chakra,
} from '@chakra-ui/react';
import { useAccount } from '../contexts/Account';

export const PoolStats = chakra((props) => {
    const { connected } = useAccount();

    return (
        <VStack {...props}>
            <VStack w="full" align="start">
                <Text fontWeight="bold">Pool stats</Text>
                <StatGroup w="full">
                    <Stat>
                        <StatNumber>DAI 500</StatNumber>
                        <StatHelpText>Of DAI 10K</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatNumber>DAI 200</StatNumber>
                        <StatHelpText>Your max coverage</StatHelpText>
                    </Stat>
                    {connected && (
                        <Stat>
                            <StatNumber>0.007%</StatNumber>
                            <StatHelpText>Your daily rate</StatHelpText>
                        </Stat>
                    )}
                </StatGroup>
            </VStack>
            <Box w="full">
                <Progress value={5} colorScheme="pink" />
            </Box>
        </VStack>
    );
});

export default PoolStats;
