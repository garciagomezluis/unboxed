/* eslint-disable no-unused-vars */
import {
    Box,
    Button,
    HStack,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { BetterRate } from './WorldIDButton';

interface PoolModalProps {
    onClose: () => void;
}

const Row: FC<{ name: string; value: string }> = ({ name, value }) => {
    return (
        <HStack py="1">
            <Text>{name}</Text>
            <Spacer />
            <Text>{value}</Text>
        </HStack>
    );
};

export const PoolModal: FC<PoolModalProps> = ({ onClose }) => {
    const onClickSave = () => {
        onClose();
    };

    return (
        <>
            <ModalHeader bg="pink.500" color="white">
                Package robbed policy
            </ModalHeader>
            <ModalBody>
                <Box py="5" borderBottom="1px" borderColor="pink.500">
                    <Row name="Protocol commissión" value="0.05%" />
                    <Row name="Trust points" value="60/100" />
                    <Row name="Daily rate" value="0.006%" />
                    <Row name="Amount to coverage" value="20" />
                    <Row name="Amount of days" value="2" />
                </Box>
                <Box py="5" borderBottom="1px" borderColor="pink.500">
                    <Row name="Coverage cost" value="20" />
                    <Row name="Final cost" value="25" />
                </Box>

                <Box py="5" borderBottom="1px" borderColor="pink.500">
                    <Row name="Starting" value="15/05/2022 00:00" />
                    <Row name="Ending" value="16/05/2022 00:00" />
                </Box>

                <VStack py="5" borderBottom="1px" borderColor="pink.500" align="center">
                    <Text>Get a lower rate!</Text>

                    <BetterRate />
                </VStack>
            </ModalBody>

            <ModalFooter>
                <Button variant="ghost" colorScheme="pink" mr={3} onClick={onClose}>
                    Close
                </Button>

                <Button colorScheme="pink" onClick={onClickSave}>
                    Get the policy
                </Button>
            </ModalFooter>
        </>
    );
};

export default PoolModal;
