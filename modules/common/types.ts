import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type PostMeta = {
  title: string;
  description: string;
};

export type SerializedPost = {
  title: string;
  lastUpdate: string;
  pinToTop?: boolean;
  tags: string[];
  contentPreview: MDXRemoteSerializeResult;
  content: MDXRemoteSerializeResult;
  slug: string;
  unlisted?: boolean;
  meta: PostMeta;
};

export type UnserializedPost = {
  title: string;
  lastUpdate: string;
  tags: string[];
  contentPreview: string;
  content: string;
  slug: string;
  unlisted?: boolean;
  meta: PostMeta;
};

export type AboutMeta = {
  title: string;
  description: string;
};

export type UnserializedAbout = {
  title: string;
  content: string;
  avatarUrl: string;
  gravatarEmail: string;
  meta: AboutMeta;
};

export type SerializedAbout = {
  title: string;
  content: MDXRemoteSerializeResult;
  avatarUrl: string;
  meta: AboutMeta;
};
