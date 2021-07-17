import {
  Box,
  Avatar,
  Flex,
  Text,
  Button,
  VStack,
  LinkProps,
  Badge,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import CustomLink from '../CustomLink';
import SoundButton from './SoundButton';

export type NavbarData = {
  personName: string;
  avatarUrl: string;
  personBio: string;
};
export type NavbarProps = { navbarData: NavbarData };

const Navbar = ({ navbarData }: NavbarProps) => {
  const linkStyle: LinkProps = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 'xl',
  };

  return (
    <Box
      h="100%"
      w="100%"
      p={{ base: '1em', lg: '2em' }}
      // bg="black"
      borderRight={{ base: '0px', lg: '2px' }}
      // borderColor="white"
      // shadow doesn't currently work because of grid
      // boxShadow="10px 0 5px -2px red"
      zIndex={1}
    >
      <Flex direction="column">
        {/* <Flex direction={{ base: 'row', lg: 'column' }}> */}
        <Avatar
          name={navbarData.personName}
          alignSelf="center"
          size="2xl"
          display={{ base: 'none', lg: 'initial' }}
          src={navbarData.avatarUrl}
        />
        <Text
          alignSelf="center"
          fontSize="3xl"
          display={{ base: 'none', lg: 'initial' }}
          fontWeight="bold"
        >
          {navbarData.personName}
        </Text>
        <Text display={{ base: 'none', lg: 'initial' }}>
          {navbarData.personBio}
        </Text>
        <Box h={{ base: '0', lg: '20' }} />
        <Stack
          alignSelf="flex-start"
          direction={{ base: 'row', lg: 'column' }}
          spacing={{ base: '2em', lg: '0.3em' }}
          alignItems="flex-start"
        >
          <CustomLink otherProps={linkStyle} href="/">
            Home
          </CustomLink>
          <CustomLink otherProps={linkStyle} href="/about-pro">
            About
            <sup>
              <Badge colorScheme="purple">Pro</Badge>
            </sup>
          </CustomLink>
          <CustomLink otherProps={linkStyle} href="/about-personal">
            About
            <sup>
              <Badge colorScheme="purple">Personal</Badge>
            </sup>
          </CustomLink>
          {/* <SoundButton /> */}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
