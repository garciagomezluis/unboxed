import { useNumberInput, HStack, Button, Input } from '@chakra-ui/react';
import { FC } from 'react';

const Stepper: FC<{ min: number; max: number; defaultValue: number }> = ({
    min,
    max,
    defaultValue,
}) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue,
        min,
        max,
        precision: 0,
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <HStack maxW="200px">
            <Button {...dec}>-</Button>
            <Input textAlign="center" {...input} />
            <Button {...inc}>+</Button>
        </HStack>
    );
};

export default Stepper;
