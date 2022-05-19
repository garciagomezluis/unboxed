import { VStack, HStack, Spacer, Checkbox, Text, chakra, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useModal } from '../contexts/Modal';
import ClaimModal from './ClaimModal';
import PoolModal from './PoolModal';
import Stepper from './Stepper';

export const CoverageForm = chakra((props) => {
    const { open, close } = useModal();

    const openCheckDetailsModal = () => {
        open({
            element: PoolModal,
            props: {
                onClose: close,
            },
        });
    };

    const openClaimModal = () => {
        open({
            element: ClaimModal,
            locked: true,
            props: {
                onClose: close,
            },
        });
    };

    return (
        <VStack align="start" {...props}>
            <Text fontWeight="bold">Get covered</Text>
            <HStack align="center" w="full">
                <Text>Amount to coverage</Text>
                <Spacer />
                <Stepper min={1} max={5} defaultValue={1} />
            </HStack>
            <HStack align="center" w="full">
                <Text>Amount of days</Text>
                <Spacer />
                <Stepper min={1} max={5} defaultValue={1} />
            </HStack>
            <HStack align="center" w="full" mt="20px !important">
                <Text>Cost</Text>
                <Spacer />
                <Text>DAI 20</Text>
            </HStack>
            <HStack w="full" align="center" mt="20px !important">
                <Checkbox defaultChecked>
                    I have read and agreed with the{' '}
                    <Link href="#" color="pink.500">
                        terms and conditions
                    </Link>
                    .
                </Checkbox>
            </HStack>
            <HStack w="full">
                <Spacer />
                <Button colorScheme="pink" onClick={openClaimModal}>
                    Claim
                </Button>
                <Button colorScheme="pink" onClick={openCheckDetailsModal}>
                    Check details
                </Button>
            </HStack>
        </VStack>
    );
});

export default CoverageForm;
