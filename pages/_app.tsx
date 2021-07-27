import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import * as gravatar from 'gravatar';
import * as contentful from 'contentful';
import { ChakraProvider } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { NavbarData } from '../modules/common/layout/Navbar';
import React, { useEffect } from 'react';
import theme from '../modules/common/theme';
import * as gtag from '../modules/common/gtag';
import MDXComponents from '../modules/common/MDXComponents';
import BackgroundMusicContext from '../modules/common/BackgroundMusicContext';
import Layout from '../modules/common/layout/Layout';
import getAvatarUrl from '../modules/common/getAvatarUrl';
import { useRouter } from 'next/dist/client/router';

type AppCustomProps = { appData: { navbarData: NavbarData } };
type CustomAppProps = AppCustomProps & AppProps;

const MyApp = ({ Component, pageProps, appData }: CustomAppProps) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
      console.log(`router change ${url}`);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <MDXProvider components={MDXComponents}>
        <BackgroundMusicContext>
          <Layout navbarData={appData.navbarData}>
            <Component {...pageProps} />
          </Layout>
        </BackgroundMusicContext>
      </MDXProvider>
    </ChakraProvider>
  );
};

MyApp.getInitialProps = async (): Promise<AppCustomProps> => {
  const isInBroswer = typeof window !== 'undefined';
  if (isInBroswer) {
    const appCustomPropsString =
      document.getElementById('__NEXT_DATA__')?.innerHTML;

    if (!appCustomPropsString) {
      throw new Error(`__NEXT_DATA__ scriptw as not found`);
    }

    const appCustomProps = JSON.parse(appCustomPropsString).props;
    return appCustomProps;
  }

  const contentfulClient = contentful.createClient({
    // FIXME
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  // type NavbarDataRaw = Omit<NavbarData, 'avatarUrl'> & {
  //   gravatarEmail: string;
  // };

  const entry = await contentfulClient.getEntries<NavbarData>({
    content_type: 'navbarData',
  });

  // console.log('entry');
  // console.dir(entry, { depth: null });

  const { personName, personBio, avatarUrl } = entry.items[0].fields;

  const sidebarData = { personName, personBio, avatarUrl };

  return {
    appData: { navbarData: sidebarData },
  };
};

export default MyApp;
