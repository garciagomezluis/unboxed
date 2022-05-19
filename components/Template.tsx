/* eslint-disable @next/next/no-sync-scripts */
import { Button, chakra, Container, HStack, Spacer, Text, VStack, Box } from '@chakra-ui/react';
import Logo from '../components/Logo';
import ConnectButton from '../components/ConnectButton';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';

const Disclaimer = chakra((props) => {
    return (
        <Box p="2" bg="blue.500" color="white" w="full" {...props}>
            <Container maxW="container.lg">
                <Text w="full" textAlign="center">
                    Testnet or alpha versión. Try at your own risk.
                </Text>
            </Container>
        </Box>
    );
});

const Header = chakra((props) => {
    const router = useRouter();

    return (
        <HStack
            as={chakra.header}
            p="5"
            borderBottom="2px"
            borderColor="pink.500"
            align="center"
            {...props}
        >
            <Logo />
            <Spacer />
            <Button colorScheme="pink" onClick={() => router.push('/supply')}>
                Supply
            </Button>
            <Button colorScheme="pink" onClick={() => router.push('/policies')}>
                Policies
            </Button>
            <ConnectButton />
        </HStack>
    );
});

const Template: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <>
            <Disclaimer pos="fixed" top="0" />

            <Container
                maxW="container.lg"
                border="2px"
                borderColor="pink.500"
                borderRadius="5"
                h="auto"
                minH="75%"
                my="50px"
                p="0"
                boxShadow="0 0 10px var(--chakra-colors-pink-500)"
                display="flex"
                flexDirection="column"
            >
                <Header />
                <VStack as={chakra.main} p="5" flex="1">
                    {children}
                </VStack>
            </Container>
        </>
    );
};

export default Template;
