import { Box, Center, Heading } from '@chakra-ui/react';
import { MDXRemote } from 'next-mdx-remote';
// import React from 'react';
import { SerializedAbout } from '../common';

export type AboutPageProps = {
  aboutData: SerializedAbout;
};

const AboutPage = ({ aboutData: { content, title } }: AboutPageProps) => {
  // return <div>About pee</div>;
  return (
    <Box p="30px" h="100%">
      <Center>
        <Box w="80ch">
          <Heading as="h1" size="2xl" mb="15px">
            {title}
          </Heading>
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
