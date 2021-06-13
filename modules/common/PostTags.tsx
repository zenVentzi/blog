import { HStack, Tag } from '@chakra-ui/react';
import React from 'react';

type PostTagsProps = {
  tags: string[];
};

const PostTags = ({ tags }: PostTagsProps) => {
  return (
    <HStack>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </HStack>
  );
};

export default PostTags;
