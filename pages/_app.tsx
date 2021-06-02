import type { AppProps /*, AppContext */ } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { Layout } from '../modules/common/layout';
import { MDXComponents } from '../modules/common';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <MDXProvider components={MDXComponents}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </ChakraProvider>
  );
};

export default MyApp;
