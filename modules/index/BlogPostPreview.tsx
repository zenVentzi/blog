import { Box, Heading, Text } from '@chakra-ui/layout';
import { MDXRemote } from 'next-mdx-remote';
import { SerializedPost } from '../common';

type BlogPostPreviewProps = {
  post: SerializedPost;
};

const BlogPostPreview = ({ post }: BlogPostPreviewProps) => {
  return (
    <Box w="80ch">
      <Heading size="lg">{post.title}</Heading>
      {/* <div dangerouslySetInnerHTML={{ __html: post.contentPreview }} /> */}
      <MDXRemote {...post.contentPreview} /*  components={components}  */ />
    </Box>
  );
};

export default BlogPostPreview;
