import { useColorMode, Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

type CustomLinkProps = {
  href: string;
  openInNewTab?: boolean;
  otherProps?: LinkProps;
  children: ReactNode;
};

const CustomLink = (props: CustomLinkProps) => {
  const { colorMode } = useColorMode();
  const restProps = props.otherProps ?? {};

  const color = {
    light: 'hsl(208, 99%, 44%)',
    dark: 'hsl(208, 95%, 68%)',
  };

  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink && !props.openInNewTab) {
    return (
      <NextLink href={href} passHref>
        <Link color={color[colorMode]} {...props.otherProps}>
          {props.children}
        </Link>
      </NextLink>
    );
  }

  return (
    <Link
      color={color[colorMode]}
      href={props.href}
      target={props.openInNewTab ? '_blank' : '_self'}
      isExternal={true}
      {...props.otherProps}
    >
      {props.children}
    </Link>
  );
};

export default CustomLink;
