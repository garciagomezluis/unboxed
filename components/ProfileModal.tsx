/* eslint-disable no-unused-vars */
import {
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
import { CircularProgressBar } from '@tomik23/react-circular-progress-bar';
import { useAccount } from '../contexts/Account';

interface PoolModalProps {
    onClose: () => void;
}

const config = {
    percent: 30,
    colorSlice: '#D53F8C',
    fontColor: '#D53F8C',
    fontSize: '1.2rem',
    fontWeight: 700,
};

export const ProfileModal: FC<PoolModalProps> = ({ onClose }) => {
    const { address } = useAccount();

    return (
        <>
            <ModalHeader bg="pink.500" color="white">
                Profile
            </ModalHeader>
            <ModalBody>
                <Text p="2" bg="gray.300" fontSize="sm" letterSpacing="1px" textAlign="center">
                    {address}
                </Text>

                <VStack mt="5">
                    <CircularProgressBar {...config} />
                    <Text pt="5">Low score</Text>
                </VStack>
            </ModalBody>

            <ModalFooter>
                <Button variant="ghost" colorScheme="pink" mr={3} onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </>
    );
};

export default ProfileModal;
