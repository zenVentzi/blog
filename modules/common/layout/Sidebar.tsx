import {
  Box,
  Avatar,
  Flex,
  Text,
  Button,
  VStack,
  LinkProps,
} from '@chakra-ui/react';
import CustomLink from '../CustomLink';

const Sidebar = () => {
  const linkStyle: LinkProps = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 'xl',
  };

  return (
    <Box
      h="100%"
      w="100%"
      p="10"
      // bg="black"
      borderRight="2px"
      // borderColor="white"
      // shadow doesn't currently work because of grid
      // boxShadow="10px 0 5px -2px red"
      zIndex={1}
    >
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
        <Box h="10" />
        <VStack alignSelf="flex-start">
          <CustomLink otherProps={linkStyle} href="/about">
            About
          </CustomLink>
          <CustomLink otherProps={linkStyle} href="/">
            Home
          </CustomLink>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
