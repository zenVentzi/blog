import { Box, Heading, Text } from '@chakra-ui/layout';
import { MDXRemote } from 'next-mdx-remote';
import { PostTags, SerializedPost } from '../common';

type BlogPostPreviewProps = {
  post: SerializedPost;
};

const BlogPostPreview = ({ post }: BlogPostPreviewProps) => {
  return (
    <Box w="80ch">
      <Heading mb="15px" size="2xl">
        {post.title}
      </Heading>
      <PostTags tags={post.tags} />
      {/* <div dangerouslySetInnerHTML={{ __html: post.contentPreview }} /> */}
      <MDXRemote {...post.contentPreview} /*  components={components}  */ />
    </Box>
  );
};

export default BlogPostPreview;
