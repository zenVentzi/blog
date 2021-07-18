import { Box, Center, Heading } from '@chakra-ui/layout';
import * as contentful from 'contentful';
import { NextSeo } from 'next-seo';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { GetStaticPaths, GetStaticProps } from 'next';
import matter from 'gray-matter';
import React from 'react';
import { SerializedPost, UnserializedPost } from '../../modules/common/types';
import LastUpdate from '../../modules/common/LastUpdate';
import PostTags from '../../modules/common/PostTags';

const contentfulClient = contentful.createClient({
  // FIXME
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

type PostProps = {
  post: SerializedPost;
};

const PostPage = ({ post }: PostProps) => {
  // console.log(post.content);
  return (
    <Box p="30px" h="100%">
      <NextSeo title={post.meta.title} description={post.meta.description} />
      <Center>
        <Box maxW={{ base: '95%', sm: '90%', lg: '80%', xl: '80ch' }}>
          <Heading as="h1" size="2xl" mb="15px">
            {post.title}
          </Heading>
          <LastUpdate lastUpdate={post.lastUpdate} />
          {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
          <PostTags tags={post.tags} />
          <MDXRemote
            {...post.content}
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

export default PostPage;

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  // console.log(context.params);

  if (!context?.params?.slug) {
    throw Error(`Slug not available`);
  }

  const entry = await contentfulClient.getEntries<UnserializedPost>({
    content_type: 'blogPost',
    'fields.slug': context.params.slug,
  });

  // console.log('entry');
  // console.dir(entry, { depth: null });

  // TODO: map just the first item
  const unserializedPost: UnserializedPost | null | undefined = entry.items.map(
    (item) => {
      const { content, data } = matter(item.fields.content);
      const contentPreview = content.substring(0, 200);

      // TODO: check data fields if empty

      return {
        title: data.title,
        tags: data.tags,
        lastUpdate: data.lastUpdate,
        content,
        contentPreview,
        slug: data.slug,
        meta: data.meta,
      };
    }
  )[0];

  // if (!post) {

  // // TODO: if null, redirect or do something
  // }

  const serializedContent = await serialize(unserializedPost!.content);
  const serializedContentPreview = await serialize(
    unserializedPost!.contentPreview
  );

  //#region dummy test mdx
  // const source = '# Heagin1';
  // console.log(unserializedPost.content);
  // const serializedContent = await serialize(source);
  // const serializedContentPreview = await serialize(source);
  //#endregion
  const serializedPost: SerializedPost = {
    ...unserializedPost,
    content: serializedContent,
    contentPreview: serializedContentPreview,
  };

  // const post: Post = {
  //   id: '',
  //   title: 'Titlee',
  //   slug: '',
  //   content:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  //   contentPreview: 'ContentPreeview',
  // };

  return {
    props: { post: serializedPost }, // will be passed to the page component as props
    revalidate: 0,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await contentfulClient.getEntries<UnserializedPost>({
    content_type: 'blogPost',
  });
  // console.dir(res, { depth: null });
  const paths = res.items.map((item) => {
    const { content, data } = matter(item.fields.content);

    return { params: { slug: data.slug } };
  });

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
};
