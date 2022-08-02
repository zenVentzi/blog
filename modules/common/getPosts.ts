import * as contentful from 'contentful';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import checkObjectEmpty from './checkObjectEmpty';
import { SerializedPost, UnserializedPost } from './types';

type GetPostsOptions = {
  limit?: number;
};

const getContentPreview = (content: string) => {
  let cPreviewLength = 200;

  //#region code explanation
  // below we look for empty character in order not to cut links in the middle
  // assumption is made that links are shorter than 120 characters
  // if there is a link longer than 120 characters
  // in the position between 140th character and 260th character
  // it will be cut and it will look ugly in the preview
  // extremely unlikely to happen though, and the penalty isn't too bad

  // the other solution is to regex for links, record their positions
  // and only cut after/before a link. This way we lose control over
  // the previewLength in case a link is too long, or short but in our
  // cutting position

  // best approach would be to extract all links in the preview region, e.g. 200 chars
  // remove their length from the previewLegnth calculation and add only the length
  // of their preview texts, that's actually visible when the user is in the browser
  //#endregion
  for (let i = 0; i < 60; i++) {
    let lastChar = content[cPreviewLength - i];
    let lastCharIsEmpty = lastChar.match(/\s/);
    if (lastCharIsEmpty) {
      cPreviewLength -= i;
      break;
    }

    lastChar = content[cPreviewLength + i];
    lastCharIsEmpty = lastChar.match(/\s/);
    if (lastCharIsEmpty) {
      cPreviewLength += i;
    }
  }

  return content.slice(0, cPreviewLength);
};

const getPosts = async (options?: GetPostsOptions) => {
  const contentfulClient = contentful.createClient({
    // FIXME
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const entry = await contentfulClient.getEntries<UnserializedPost>({
    content_type: 'blogPost',
    limit: options?.limit,
  });

  // console.log('entry');
  // console.dir(entry, { depth: null });

  const unserializedPosts: UnserializedPost[] | null | undefined =
    entry.items.map((item) => {
      const { content, data } = matter(item.fields.content);
      let contentPreview = getContentPreview(content);
      const showReadMoreButton = contentPreview.length < content.length;

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
