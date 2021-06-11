import { useColorMode, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

type CustomLinkProps = { href: string; children: ReactNode };

const CustomLink = (props: CustomLinkProps) => {
  const { colorMode } = useColorMode();

  const color = {
    light: 'hsl(208, 99%, 44%)',
    dark: 'hsl(208, 95%, 68%)',
  };

  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color={color[colorMode]}>{props.children}</Link>
      </NextLink>
    );
  }

  return (
    <Link color={color[colorMode]} href={props.href} isExternal={true}>
      {props.children}
    </Link>
  );
};

export default CustomLink;
