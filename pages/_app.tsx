import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '../theme';
import ModalProvider from '../contexts/Modal';
import AccountProvider from '../contexts/Account';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <AccountProvider>
                <ModalProvider>
                    <Component {...pageProps} />
                </ModalProvider>
            </AccountProvider>
        </ChakraProvider>
    );
}

export default MyApp;
