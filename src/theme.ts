import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        body: "Montserrat, sans-serif",
    },
    styles: {
        global: {
            "b, strong": {
                color: "red.600",
            },
            "i, em": {
                color: "purple.600",
            },
            p: {
                color: "gray.800",
            },
        },
    },
});

export default theme;
