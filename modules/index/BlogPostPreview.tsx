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
  return (
    <Box w="80ch">
      {/* <Heading mb="15px" size="2xl">
        {post.title}
      </Heading> */}
      <CustomLink
        href={`blog/${post.slug}`}
        otherProps={{
          color: 'white',
          fontSize: '5xl',
          fontWeight: 'bold',
        }}
      >
        {post.title}
      </CustomLink>
      <LastUpdate lastUpdate={post.lastUpdate} />
      <PostTags tags={post.tags} />
      {/* <div dangerouslySetInnerHTML={{ __html: post.contentPreview }} /> */}
      <MDXRemote {...post.contentPreview} /*  components={components}  */ />
    </Box>
  );
};

export default BlogPostPreview;
