import type { AppProps /*, AppContext */ } from 'next/app';
import * as gravatar from 'gravatar';
import * as contentful from 'contentful';
import { ChakraProvider } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { SidebarData } from '../modules/common/layout/Sidebar';
import React from 'react';
import theme from '../modules/common/theme';
import MDXComponents from '../modules/common/MDXComponents';
import BackgroundMusicContext from '../modules/common/BackgroundMusicContext';
import Layout from '../modules/common/layout/Layout';

type AppCustomProps = { appData: { sidebarData: SidebarData } };
type CustomAppProps = AppCustomProps & AppProps;

const MyApp = ({ Component, pageProps, appData }: CustomAppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <MDXProvider components={MDXComponents}>
        <BackgroundMusicContext>
          <Layout sidebarData={appData.sidebarData}>
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

  type SidebarDataRaw = Omit<SidebarData, 'avatarUrl'> & {
    gravatarEmail: string;
  };

  const entry = await contentfulClient.getEntries<SidebarDataRaw>({
    content_type: 'sidebarData',
  });

  // console.log('entry');
  // console.dir(entry, { depth: null });

  const { personName, personBio, gravatarEmail } = entry.items[0].fields;

  const avatarUrl = gravatar.url(gravatarEmail, {
    s: '200',
    r: 'pg',
    d: '404',
  });

  const sidebarData = { personName, personBio, avatarUrl };

  return {
    appData: { sidebarData },
  };
};

export default MyApp;
