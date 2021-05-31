import { Box, Flex, VStack } from '@chakra-ui/react';
import { BlogPostPreivew } from '../modules/index';

const Index = () => {
  return (
    <div>
      <VStack spacing="20px" pt="30px">
        {[...Array(40).keys()].map((i) => {
          return (
            <BlogPostPreivew
              key={i}
              post={{
                title: i + ' Titleeee',
                content: '',
                contentPreview:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
              }}
            />
          );
        })}
      </VStack>
    </div>
  );
};

export default Index;
