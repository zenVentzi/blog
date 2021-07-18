import { VStack, Text } from '@chakra-ui/react';
import CustomLink from '../modules/common/CustomLink';

const ServerError = () => {
  return (
    <VStack align="center" justify="center">
      <Text>
        Server error. Feel free to{' '}
        <CustomLink href="/contact">contact</CustomLink> the stupid developer to
        fix this mess
      </Text>
    </VStack>
  );
};

export default ServerError;
