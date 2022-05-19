import { Box } from '@chakra-ui/react';
import { defaultAbiCoder as abi } from '@ethersproject/abi';
import { keccak256 } from '@ethersproject/solidity';
import React, { FC, useEffect, useState } from 'react';
import { useAccount } from '../contexts/Account';

export const CONTRACT_ADDRESS = '0x32D59776E91fdb3F377755e12cEC05d9067c2B4F';

const hashBytes = (input: string): string => {
    return abi.encode(['uint256'], [BigInt(keccak256(['bytes'], [input])) >> BigInt(8)]);
};

type VerificationResponse = any;

export const BetterRate = () => {
    const [proof, setProof] = useState<VerificationResponse | null>(null);

    if (!proof) return <WorldIDButton setProof={setProof} />;

    return <>connected</>;
};

export const WorldIDButton: FC<{ setProof: (proof: VerificationResponse) => void }> = ({
    setProof,
}) => {
    const { address: signal } = useAccount();

    const enableWorldID = async () => {
        try {
            const result = await worldID.enable();
            setProof(result);
            console.log('World ID verified successfully: ', result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!worldID.isInitialized()) {
            worldID.init('world-id-container', {
                actionId: hashBytes(CONTRACT_ADDRESS),
                signal,
                appName: 'Unboxed',
                signalDescription: 'holis',
            });
        }

        if (!worldID.isEnabled()) {
            enableWorldID().catch(console.error.bind(console));
        }
    }, []);

    return <Box id="world-id-container" />;
};

export default WorldIDButton;
