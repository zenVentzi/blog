import { Box, Center, Heading } from '@chakra-ui/layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Post } from '../../modules/common';

type PostProps = {
  post: Post;
};

const PostPage = ({ post }: PostProps) => {
  return (
    <Box p="30px">
      <Center>
        <Box w="80ch">
          <Heading mb="15px">{post.title}</Heading>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Box>
      </Center>
    </Box>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const post: Post = {
    title: 'Titlee',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    contentPreview: 'ContentPreeview',
  };

  return {
    props: { post }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: 'test' } }, // See the "paths" section below
    ],
    fallback: false, // See the "fallback" section below
  };
};
