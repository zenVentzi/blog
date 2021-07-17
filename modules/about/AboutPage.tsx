import { Avatar, Box, Center, Heading } from '@chakra-ui/react';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import React from 'react';
import { SerializedAbout } from '../common/types';
// import React from 'react';

export type AboutPageProps = {
  aboutData: SerializedAbout;
};

const AboutPage = ({
  aboutData: { content, title, avatarUrl, meta },
}: AboutPageProps) => {
  // return <div>About pee</div>;
  return (
    <Box p="30px" h="100%">
      <NextSeo title={meta.title} description={meta.description} />
      <Center>
        <Box w="80ch">
          <Heading as="h1" size="2xl" mb="15px">
            {title}
          </Heading>
          <Center>
            <Avatar
              name={'Zen Ventzi'}
              iconLabel="Bas"
              // alignSelf="center"
              size="2xl"
              display={{ base: 'inline-block', lg: 'none' }}
              src={avatarUrl}
            />
          </Center>
          <MDXRemote
            {...content}
            components={
              {
                /*
                  here you can override global components e.g.
                  h1: null
                  etc.
                */
              }
            }
          />
        </Box>
      </Center>
    </Box>
  );
};

export default AboutPage;
