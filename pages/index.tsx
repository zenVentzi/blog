import { Box, Flex, Divider, VStack, Center } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import * as contentful from 'contentful';
import { SerializedPost, UnserializedPost } from '../modules/common';
import { BlogPostPreivew } from '../modules/index';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const contentfulClient = contentful.createClient({
  // FIXME
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

type IndexProps = {
  posts: SerializedPost[];
};

const Index = ({ posts }: IndexProps) => {
  return (
    <div>
      <VStack
        spacing="20px"
        pt="30px"
        divider={
          // <Center>
          <Divider width="40%" />
          // </Center>
        }
      >
        {posts.map((post) => {
          return <BlogPostPreivew key={post.slug} post={post} />;
        })}
      </VStack>
    </div>
  );
};

export default Index;

export const getStaticProps: GetStaticProps<IndexProps> = async (context) => {
  // console.log(context.params);

  const entry = await contentfulClient.getEntries<UnserializedPost>({
    content_type: 'blogPost',
  });

  // console.log('entry');
  // console.dir(entry, { depth: null });

  const unserializedPosts: UnserializedPost[] | null | undefined =
    entry.items.map((item) => {
      const { content, data } = matter(item.fields.content);
      const contentPreview = content.substring(0, 200);

      // TODO: check data fields if empty

      return {
        title: data.title,
        tags: data.tags,
        content,
        contentPreview,
        slug: data.slug,
      };
    });

  const serializedPosts: SerializedPost[] = await Promise.all(
    unserializedPosts.map(async (unPost) => {
      const serializedContent = await serialize(unPost.content);
      const serializedContentPreview = await serialize(unPost.contentPreview);
      const serializedPost: SerializedPost = {
        ...unPost,
        content: serializedContent,
        contentPreview: serializedContentPreview,
      };

      return serializedPost;
    })
  );

  return {
    props: { posts: serializedPosts },
  };
};
