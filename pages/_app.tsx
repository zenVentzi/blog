import type { AppProps /*, AppContext */ } from 'next/app';
import * as gravatar from 'gravatar';
import * as contentful from 'contentful';
import { ChakraProvider } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { Layout } from '../modules/common/layout';
import { MDXComponents, theme } from '../modules/common';
import { SidebarData } from '../modules/common/layout/Sidebar';

type AppData = { appData: { sidebarData: SidebarData } };
type CustomAppProps = AppData & AppProps;

const MyApp = ({ Component, pageProps, appData }: CustomAppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <MDXProvider components={MDXComponents}>
        <Layout sidebarData={appData.sidebarData}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </ChakraProvider>
  );
};

MyApp.getInitialProps = async (): Promise<AppData> => {
  // const isInBroswer = typeof window !== undefined;
  // if (isInBroswer) {
  //   return;
  // }

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

  console.log(sidebarData);

  return {
    appData: { sidebarData },
  };
};

export default MyApp;
