import {
  Box,
  Alert,
  Code,
  Heading,
  Link,
  Text,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
// import { MDXProviderComponents } from '@mdx-js/react';
import CustomLink from './CustomLink';

const Quote = (props: any) => {
  const { colorMode } = useColorMode();
  const bgColor = {
    light: 'blue.50',
    dark: 'blue.900',
  };

  return (
    <Alert
      mt={4}
      w="98%"
      bg={bgColor[colorMode]}
      variant="left-accent"
      status="info"
      css={{
        '> *:first-of-type': {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    />
  );
};

const Hr = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray.200',
    dark: 'gray.600',
  };

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
};

const Spacing = (props: any) => {
  return (
    <>
      <br />
      {props.children}
    </>
  );
};

const MDXComponents: any = {
  /* eslint-disable react/display-name */
  // can fix by:

  h1: (props: any) => <Heading as="h1" size="md" {...props} />,
  // h1: (props: any) => <Spacing><Heading as="h1" size="md" {...props} /></Spacing>,
  h2: (props: any) => (
    <Spacing>
      <Heading as="h2" size="sm" fontWeight="bold" {...props} />
    </Spacing>
  ),
  h3: (props: any) => (
    <Spacing>
      <Heading as="h3" size="xs" fontWeight="bold" {...props} />
    </Spacing>
  ),
  h4: (props: any) => (
    <Spacing>
      <Heading as="h4" size="xs" fontWeight="bold" {...props} />
    </Spacing>
  ),
  h5: (props: any) => (
    <Spacing>
      <Heading as="h5" size="xs" fontWeight="bold" {...props} />
    </Spacing>
  ),
  h6: (props: any) => (
    <Spacing>
      <Heading as="h6" size="xs" fontWeight="bold" {...props} />
    </Spacing>
  ),
  inlineCode: (props: any) => (
    <Code colorScheme="yellow" fontSize="0.84em" {...props} />
  ),
  br: (props: any) => <Box height="24px" {...props} />,
  hr: Hr,
  a: CustomLink,
  p: (props: any) => <Text as="p" mt={3} lineHeight="tall" {...props} />,
  ul: (props: any) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props: any) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props: any) => <Box as="li" pb={1} {...props} />,
  blockquote: Quote,
  Link,
};

/* eslint-enable react/display-name */

export default MDXComponents;
