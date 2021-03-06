/* eslint-disable no-unused-vars */
import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { FC, createContext, useContext, useState, ReactNode } from 'react';

type ModalConfigType = {
    element: FC<any> | null;
    props: any;
    locked?: boolean;
    size?: 'xl';
};

const ModalContext = createContext<{
    open: (modalConfig: ModalConfigType) => void;
    close: () => void;
}>({
    open: () => {},
    close: () => {},
});

export const useModal = () => {
    return useContext(ModalContext);
};

const defaultModalConfig: ModalConfigType = {
    element: null,
    props: {},
    locked: false,
};

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [{ element: Element, props, locked, size }, setModalConfig] =
        useState(defaultModalConfig);

    const { isOpen, onClose, onOpen } = useDisclosure();

    const open = ({ element, props, locked = false, size }: ModalConfigType) => {
        setModalConfig({
            locked,
            element,
            props,
            size,
        });
        onOpen();
    };

    const close = () => {
        setModalConfig(defaultModalConfig);
        onClose();
    };

    return (
        <ModalContext.Provider value={{ open, close }}>
            <Modal
                closeOnEsc={!locked}
                closeOnOverlayClick={!locked}
                isOpen={isOpen}
                onClose={onClose}
                size={size}
            >
                <ModalOverlay />
                <ModalContent overflow="hidden">
                    {Element !== null && <Element {...props} />}
                </ModalContent>
            </Modal>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
