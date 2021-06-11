import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type SerializedPost = {
  title: string;
  contentPreview: MDXRemoteSerializeResult;
  content: MDXRemoteSerializeResult;
  slug: string;
};

export type UnserializedPost = {
  title: string;
  contentPreview: string;
  content: string;
  slug: string;
};
