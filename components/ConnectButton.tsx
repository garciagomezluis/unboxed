import { Button } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { useAccount } from '../contexts/Account';
import { useModal } from '../contexts/Modal';
import ProfileModal from './ProfileModal';

export const ConnectButton: FC<PropsWithChildren<{}>> = ({ children }) => {
    const { connect, connected, viewAddress } = useAccount();
    const { open, close } = useModal();

    const openProfileModal = () => {
        open({
            element: ProfileModal,
            props: {
                onClose: close,
            },
        });
    };

    if (connected && children) return <>{children}</>;

    const text = connected ? viewAddress : 'Connect';

    return (
        <Button colorScheme="pink" onClick={() => (connected ? openProfileModal() : connect())}>
            {text}
        </Button>
    );
};

export default ConnectButton;
