import { chakra, Text } from '@chakra-ui/react';

export const Logo = chakra(({ ...props }) => (
    <Text
        color="pink.500"
        textShadow="0 0 10px var(--chakra-colors-pink-500)"
        fontSize="2xl"
        textTransform="uppercase"
        letterSpacing="1px"
        fontWeight="black"
        {...props}
    >
        Unboxed
    </Text>
));

export default Logo;
