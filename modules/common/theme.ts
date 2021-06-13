import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    // keep colors in theme, so that future small changes in color reflect the whole app
    black: 'black',
    gray: 'gray',
    white: 'white',
    // brand: {
    //   100: '#f7fafc',
    //   // ...
    //   900: '#1a202c',
    // },
  },
});

export default theme;
