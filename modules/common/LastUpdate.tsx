import { Box, Heading, Text } from '@chakra-ui/layout';

type LastUpdateProps = { lastUpdate: string };

const LastUpdate = ({ lastUpdate }: LastUpdateProps) => {
  return (
    <Text fontWeight={'hairline'} mb="1">
      Last update: {lastUpdate}
    </Text>
  );
};

export default LastUpdate;
