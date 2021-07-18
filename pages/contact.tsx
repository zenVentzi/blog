import { GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import * as contentful from 'contentful';
import React from 'react';
import { Box, Text, Center, HStack, VStack, Link } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiFacebook } from 'react-icons/fi';
import { Icon } from '@chakra-ui/react';
import { ContactPageData } from '../modules/contact/types';
import ContactLink from '../modules/contact/ContactLink';

type ContactProps = {
  contactPageData: ContactPageData;
};

const Contact = ({ contactPageData }: ContactProps) => {
  // return <div>test</div>;
  return (
    <Box /* p="30px" */ h="100%">
      <NextSeo />
      <Center>
        <VStack justify="center" height="100vh" align="flex-start">
          <ContactLink type="email" link={contactPageData.email} />
          <ContactLink type="linkedIn" link={contactPageData.linkedIn} />
          <ContactLink type="github" link={contactPageData.github} />
          <ContactLink
            type="stackOverflow"
            link={contactPageData.stackOverflow}
          />
          <ContactLink type="fb" link={contactPageData.fb} />
          <ContactLink type="twitter" link={contactPageData.twitter} />
        </VStack>
      </Center>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<ContactProps> = async (context) => {
  const contentfulClient = contentful.createClient({
    // FIXME
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const entry = await contentfulClient.getEntries<{ content: string }>({
    content_type: 'contactPageData',
  });

  // TODO: map just the first item
  const contactPageData: ContactPageData | null | undefined = entry.items.map(
    (item) => {
      const { content, data } = matter(item.fields.content);
      // TODO: check data fields if empty

      return {
        fb: data.fb,
        twitter: data.twitter,
        linkedIn: data.linkedIn,
        stackOverflow: data.stackOverflow,
        github: data.github,
        email: data.email,
      };
    }
  )[0];

  // console.log(contactPageData);

  return { props: { contactPageData }, revalidate: 1 };
};

export default Contact;
