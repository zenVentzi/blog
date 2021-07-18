import { HStack, Text, Icon, Link } from '@chakra-ui/react';
import React from 'react';
import { FaStackOverflow } from 'react-icons/fa';
import {
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
} from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import { ContactPageData } from './types';

type IconDictionary = { [key in keyof ContactPageData]: IconType };

const iconDictionary: IconDictionary = {
  fb: FiFacebook,
  twitter: FiTwitter,
  linkedIn: FiLinkedin,
  stackOverflow: FaStackOverflow,
  github: FiGithub,
  email: FiMail,
};

type ContactLinkProps = { type: keyof ContactPageData; link: string };

const ContactLink = ({ type, link }: ContactLinkProps) => {
  const href = type === 'email' ? `mailto:${link}` : link;

  return (
    <HStack>
      <Icon as={iconDictionary[type]} />
      <Link href={href} target="_blank">
        <Text>{link}</Text>
      </Link>
    </HStack>
  );
};

export default ContactLink;
