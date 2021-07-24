import { Box, Flex, Divider, VStack, Center, HStack } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import * as contentful from 'contentful';
import { format, compareDesc } from 'date-fns';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import React, { useState } from 'react';
import BlogPostPreview from '../modules/index/BlogPostPreview';
import { SerializedPost, UnserializedPost } from '../modules/common/types';
import { IndexMeta } from '../modules/index/types';
import getPosts from '../modules/common/getPosts';

const contentfulClient = contentful.createClient({
  // FIXME
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

type Posts = IndexProps['posts'];

const sortPosts = (postA: SerializedPost, postB: SerializedPost) => {
  const dateA = new Date(postA.lastUpdate);
  const dateB = new Date(postB.lastUpdate);

  // desc = latest(newest) first oldest last
  return compareDesc(dateA, dateB);
};

const getOrderedPosts = (unOrderedPosts: Posts): Posts => {
  const pinnedPost = unOrderedPosts.filter((p) => !!p.pinToTop)[0];
  let orderedPosts = unOrderedPosts.sort(sortPosts);
  orderedPosts = [pinnedPost, ...orderedPosts];
  orderedPosts = [...new Set(orderedPosts)];

  return orderedPosts;
};

type IndexProps = {
  posts: SerializedPost[];
  meta: IndexMeta;
};

const Index = ({ posts, meta }: IndexProps) => {
  const [orderedPosts] = useState(getOrderedPosts(posts));

  return (
    <div>
      <NextSeo title={meta.title} description={meta.description} />
      <Center>
        <VStack
          spacing="20px"
          pt="30px"
          pb={{ base: '1em', md: '2em' }}
          // maxWidth={{ base: '50%' }}
          // width="50%"
          maxWidth={{ base: '95%', md: '85%', lg: '80%' }}
          // style={{ background: 'green' }}
          // justify="center"
          align="flex-start"
          divider={
            <HStack w="100%" justify="center" visibility="hidden">
              <Divider
                width={{ base: '80%', sm: '70%', md: '50%' /* lg: '40%' */ }}
                visibility="visible"
              />
            </HStack>
          }
        >
          {orderedPosts.map((post) => {
            return <BlogPostPreview key={post.slug} post={post} />;
          })}
          {/* <div>teeeeeest</div>
        <div style={{ background: 'red' }}>teeeeeest</div> */}
        </VStack>
      </Center>
    </div>
  );
};

export default Index;

export const getStaticProps: GetStaticProps<IndexProps> = async (context) => {
  // console.log(context.params);

  const posts = await getPosts();

  const metaEntry = await contentfulClient.getEntries<IndexMeta>({
    content_type: 'homePageMeta',
  });
  const homeMeta: IndexMeta = metaEntry.items.map((item) => {
    return { title: item.fields.title, description: item.fields.description };
  })[0];

  return {
    props: { posts, meta: homeMeta },
    revalidate: 1,
  };
};
