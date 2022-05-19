import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
    config,
    styles: {
        global: {
            '*': {
                // transition: 'all .2s ease-in',
            },
            'html, body': {
                h: 'calc(100vh - 100px)',
            },
            '#__next, .chakra-container': {
                h: 'full',
            },
            'body': {
                bg: '#dad7cd',
            },
            'li': {
                listStyleType: 'none !important',
            },
        },
    },
});

export default theme;
