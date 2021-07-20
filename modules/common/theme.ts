import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  config,
  fonts: {
    heading: 'Open Sans',
    body: 'Raleway',
  },
  styles: {
    // global: (props) => {
    //   return {
    //     '*': {
    //       color: props.theme.colors.white,
    //     },
    //   };
    // },
  },
  colors: {
    // keep colors in theme, so that future small changes in color reflect the whole app
    // black: 'black',
    // gray: 'gray',
    // white: 'white',
    // brand: {
    //   100: '#f7fafc',
    //   // ...
    //   900: '#1a202c',
    // },
  },
});

export default theme;
