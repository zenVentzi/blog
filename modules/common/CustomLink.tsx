import { useColorMode, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

type CustomLinkProps = { href: string };

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
        <Link color={color[colorMode]} />
      </NextLink>
    );
  }

  return <Link color={color[colorMode]} isExternal={true} />;
};

export default CustomLink;
