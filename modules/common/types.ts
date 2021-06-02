import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type SerializedPost = {
  id: string;
  title: string;
  contentPreview: MDXRemoteSerializeResult;
  content: MDXRemoteSerializeResult;
  slug: string;
};

export type UnserializedPost = {
  id: string;
  title: string;
  contentPreview: string;
  content: string;
  slug: string;
};
