import { Grid, GridItem } from '@chakra-ui/react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Grid h="100vh" templateRows="1fr" templateColumns="20% 80%">
      <GridItem rowSpan={1} colSpan={1} bg="tomato"></GridItem>
      <GridItem colSpan={1} bg="papayawhip">
        Layout <br />
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
