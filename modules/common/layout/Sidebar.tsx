import {
  Box,
  Avatar,
  Flex,
  Text,
  Button,
  VStack,
  LinkProps,
  Badge,
} from '@chakra-ui/react';
import React from 'react';
import CustomLink from '../CustomLink';
import SoundButton from './SoundButton';

export type SidebarData = {
  personName: string;
  avatarUrl: string;
  personBio: string;
};
export type SidebarProps = { sidebarData: SidebarData };

const Sidebar = ({ sidebarData }: SidebarProps) => {
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
      <Flex direction="column">
        <Avatar
          name={sidebarData.personName}
          alignSelf="center"
          size="2xl"
          src={sidebarData.avatarUrl}
        />
        <Text alignSelf="center" fontSize="3xl" fontWeight="bold">
          {sidebarData.personName}
        </Text>
        <Text>{sidebarData.personBio}</Text>
        <Box h="10" />
        <VStack alignSelf="flex-start" alignItems="flex-start">
          <CustomLink otherProps={linkStyle} href="/about">
            About
            <sup>
              <Badge colorScheme="purple">Personal</Badge>
            </sup>
          </CustomLink>
          <CustomLink otherProps={linkStyle} href="/about">
            About
            <sup>
              <Badge colorScheme="purple">Pro</Badge>
            </sup>
          </CustomLink>
          <CustomLink otherProps={linkStyle} href="/">
            Home
          </CustomLink>
          {/* <SoundButton /> */}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
