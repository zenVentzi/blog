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
  Divider,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { FaRssSquare } from 'react-icons/fa';
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
    fontSize: { base: 'sm', md: 'xl' /* lg: 'xl' */ },
  };

  // const dividerOrientation = useBreakpointValue<'horizontal' | 'vertical'>({
  //   base: 'horizontal',
  //   lg: 'vertical',
  // });

  return (
    <Box
      h="100%"
      w="100%"
      p={{ base: '0.5em', lg: '2em' }}
      // bg="black"
      borderRight={{ base: '0px', lg: '2px' }}
      // borderBottom={{ base: '1px', lg: '0px' }}
      // borderColor="white"
      // shadow doesn't currently work because of grid
      // boxShadow="10px 0 5px -2px red"
      zIndex={1}
    >
      <nav>
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
          <Text
            display={{ base: 'none', lg: 'initial' }}
            alignSelf="center"
            textAlign="center"
          >
            {navbarData.personBio}
          </Text>
          <Box h={{ base: '0', lg: '20' }} />
          <Stack
            alignSelf="flex-start"
            direction={{ base: 'row', lg: 'column' }}
            spacing={{
              base: '1em',
              sm: '2em',
              lg: '0.3em' /* lg is vertical */,
            }}
            alignItems="flex-start"
          >
            <CustomLink otherProps={linkStyle} href="/">
              Home
            </CustomLink>
            <CustomLink otherProps={linkStyle} href="/about-pro">
              About
              <sup>
                <Badge
                  colorScheme="purple"
                  fontSize={{ base: '0.7em', md: '1em' }}
                >
                  Pro
                </Badge>
              </sup>
            </CustomLink>
            <CustomLink otherProps={linkStyle} href="/about-personal">
              About
              <sup>
                <Badge
                  colorScheme="purple"
                  fontSize={{ base: '0.7em', md: '1em' }}
                >
                  Personal
                </Badge>
              </sup>
            </CustomLink>
            <CustomLink otherProps={linkStyle} href="/contact">
              Contact
            </CustomLink>
            <CustomLink otherProps={linkStyle} href="/rss">
              Follow
              <sup>
                <Badge
                  colorScheme="orange"
                  ml="0.2em"
                  fontSize={{ base: '0.7em', md: '1em' }}
                >
                  RSS <Icon as={FaRssSquare}></Icon>
                </Badge>
              </sup>
            </CustomLink>
            {/* <SoundButton /> */}
          </Stack>
        </Flex>
        <Divider orientation={'horizontal'} display={{ lg: 'none' }} />
      </nav>
    </Box>
  );
};

export default Navbar;
