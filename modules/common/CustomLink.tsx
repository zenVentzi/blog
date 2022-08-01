import { useColorMode, Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

type CustomLinkProps = LinkProps;
// type CustomLinkProps = {
//   href: string;
//   openInNewTab?: boolean;
//   otherProps?: LinkProps;
//   children: ReactNode;
// };

const CustomLink = (props: CustomLinkProps) => {
  const { colorMode } = useColorMode();
  // const restProps = props.otherProps ?? {};

  const color = {
    light: 'hsl(208, 99%, 44%)',
    dark: 'hsl(208, 95%, 68%)',
  };

  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
  const openInNewTab = props.target == '_blank';
  if (isInternalLink && !openInNewTab) {
    // if (isInternalLink && !props.openInNewTab) {
    return (
      <NextLink href={href} passHref>
        <Link {...props} color={color[colorMode]}>
          {props.children}
        </Link>
      </NextLink>
    );
  }

  return (
    <Link {...props} color={color[colorMode]} isExternal={true}>
      {props.children}
    </Link>
  );
};

export default CustomLink;
