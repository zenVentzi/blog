import { Box, Heading, Text } from '@chakra-ui/layout';

type Post = {
  title: string;
  contentPreview: string;
};

type BlogPostPreviewProps = {
  post: Post;
};

const BlogPostPreview = ({ post }: BlogPostPreviewProps) => {
  return (
    <Box w="80ch">
      <Heading size="lg">{post.title}</Heading>
      <div dangerouslySetInnerHTML={{ __html: post.contentPreview }} />
    </Box>
  );
};

export default BlogPostPreview;
