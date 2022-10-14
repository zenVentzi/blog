import { Box, Heading, Text } from '@chakra-ui/layout';

type LastUpdateProps = { lastUpdate: string };

const LastUpdate = ({ lastUpdate }: LastUpdateProps) => {
  return (
    <Text fontWeight={'hairline'} fontSize="sm" mt="-1em" mb="1">
      {lastUpdate}
    </Text>
  );
};

export default LastUpdate;
