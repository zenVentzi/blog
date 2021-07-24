import * as contentful from 'contentful';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import checkObjectEmpty from './checkObjectEmpty';
import { SerializedPost, UnserializedPost } from './types';

type GetPostsOptions = {
  limit?: number;
};

const getPosts = async (options?: GetPostsOptions) => {
  const contentfulClient = contentful.createClient({
    // FIXME
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const entry = await contentfulClient.getEntries<UnserializedPost>({
    content_type: 'blogPost',
    limit: options?.limit ?? null,
  });

  // console.log('entry');
  // console.dir(entry, { depth: null });

  const unserializedPosts: UnserializedPost[] | null | undefined =
    entry.items.map((item) => {
      const { content, data } = matter(item.fields.content);
      const showReadMoreButton =
        content.substring(0, 200).length < content.length;

      let contentPreview = content.substring(0, 200);

      if (showReadMoreButton) {
        contentPreview += `<a href="/blog/${data.slug}"> Read more </a>`;
      }

      if (!data || checkObjectEmpty(data)) {
        throw Error(`data cannot be empty`);
      }

      // TODO: check data fields if empty

      return {
        title: data.title,
        pinToTop: !!data.pinToTop,
        lastUpdate: data.lastUpdate,
        tags: data.tags,
        content,
        contentPreview,
        slug: data.slug,
        meta: data.meta,
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

  return serializedPosts;
};

export default getPosts;
