import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type SerializedPost = {
  title: string;
  lastUpdate: string;
  tags: string[];
  contentPreview: MDXRemoteSerializeResult;
  content: MDXRemoteSerializeResult;
  slug: string;
};

export type UnserializedPost = {
  title: string;
  lastUpdate: string;
  tags: string[];
  contentPreview: string;
  content: string;
  slug: string;
};

export type UnserializedAbout = {
  title: string;
  content: string;
};

export type SerializedAbout = {
  title: string;
  content: MDXRemoteSerializeResult;
};
