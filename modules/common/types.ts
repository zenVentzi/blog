import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type SerializedPost = {
  title: string;
  tags: string[];
  contentPreview: MDXRemoteSerializeResult;
  content: MDXRemoteSerializeResult;
  slug: string;
};

export type UnserializedPost = {
  title: string;
  tags: string[];
  contentPreview: string;
  content: string;
  slug: string;
};
