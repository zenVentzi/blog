import { Box, Center, Heading } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import * as contentful from 'contentful';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import { SerializedAbout, UnserializedAbout } from '../modules/common';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

type AboutProps = {
  aboutData: SerializedAbout;
};

const contentfulClient = contentful.createClient({
  // FIXME
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

const About = ({ aboutData: { content, title } }: AboutProps) => {
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

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  const entry = await contentfulClient.getEntries<UnserializedAbout>({
    content_type: 'aboutPage',
  });

  // console.log('entry');
  // console.dir(entry, { depth: null });

  // TODO: map just the first item
  const unserializedAbout: UnserializedAbout | null | undefined =
    entry.items.map((item) => {
      const { content, data } = matter(item.fields.content);

      // TODO: check data fields if empty

      return {
        title: data.title,
        content,
      };
    })[0];

  const serializedContent = await serialize(unserializedAbout!.content);

  const serializedAbout: SerializedAbout = {
    ...unserializedAbout,
    content: serializedContent,
  };

  return {
    props: { aboutData: serializedAbout }, // will be passed to the page component as props
  };
};

export default About;
