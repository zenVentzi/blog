import { Box, Center, Heading } from '@chakra-ui/layout';
import * as contentful from 'contentful';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Post } from '../../modules/common';

const contentfulClient = contentful.createClient({
  // FIXME
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

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
  // console.log(context.params);

  if (!context?.params?.slug) {
    throw Error(`Slug not available`);
  }

  const entry = await contentfulClient.getEntries<Post>({
    content_type: 'blogPost',
    'fields.slug': context.params.slug,
  });

  // console.log('entry');
  // console.dir(entry, { depth: null });

  const post: Post | null | undefined = entry.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    content: item.fields.content,
    contentPreview: item.fields.contentPreview,
    slug: item.fields.slug,
  }))[0];

  // TODO: if null, redirect or do something

  // const post: Post = {
  //   id: '',
  //   title: 'Titlee',
  //   slug: '',
  //   content:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  //   contentPreview: 'ContentPreeview',
  // };

  return {
    props: { post }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await contentfulClient.getEntries<Post>({
    content_type: 'blogPost',
  });
  // console.dir(res, { depth: null });
  const posts = res.items.map((item) => {
    return { ...item.fields, id: item.sys.id };
  });

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false, // See the "fallback" section below
  };
};
