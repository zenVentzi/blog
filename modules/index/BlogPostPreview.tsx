import { Box, Heading, Text } from '@chakra-ui/layout';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import CustomLink from '../common/CustomLink';
import LastUpdate from '../common/LastUpdate';
import PostTags from '../common/PostTags';
import { SerializedPost } from '../common/types';

type BlogPostPreviewProps = {
  post: SerializedPost;
};

const BlogPostPreview = ({ post }: BlogPostPreviewProps) => {
  // return <div>phaha</div>;
  return (
    <Box maxW={{ base: '100%', xl: '80ch' }}>
      {/* <Box maxW="80ch"> */}
      {/* <Heading mb="15px" size="2xl">
        {post.title}
      </Heading> */}
      <CustomLink
        href={`/blog/${post.slug}`}
        otherProps={{
          color: 'white',
          fontSize: 'xl',
          fontWeight: 'bold',
        }}
      >
        <Heading as="h1" size="md" mb="15px">
          {post.title}
        </Heading>
      </CustomLink>
      <LastUpdate lastUpdate={post.lastUpdate} />
      <PostTags tags={post.tags} />
      <MDXRemote {...post.contentPreview} />
    </Box>
  );
};

/* 

      <MDXRemote {...post.contentPreview} />

*/

export default BlogPostPreview;
