import { Box, Avatar, Flex, Text } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Box h="100%" w="100%" p="10">
      <Flex direction="column" /* alignItems="center" */>
        <Avatar
          name="Zen Ventzi"
          alignSelf="center"
          size="2xl"
          src="https://bit.ly/sage-adebayo"
        />
        <Text alignSelf="center" fontSize="3xl" fontWeight="bold">
          Zen Ventzi
        </Text>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Text>
      </Flex>
    </Box>
  );
};

export default Sidebar;