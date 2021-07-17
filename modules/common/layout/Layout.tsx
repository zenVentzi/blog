import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Navbar, { NavbarData } from './Navbar';

type LayoutProps = {
  navbarData: NavbarData;
  children: React.ReactNode;
};

const Layout = ({ children, navbarData }: LayoutProps) => {
  // if wider than x then have sidebar
  return (
    <Grid
      h="100vh"
      templateRows={{ base: 'auto 1fr', lg: '1fr' }}
      templateColumns={{ base: '1fr', lg: '25% 75%' }}
    >
      {/* <Grid h="100vh" templateRows="1fr" templateColumns="20% 80%"> */}
      <GridItem /* rowSpan={1} colSpan={1} */>
        <Navbar navbarData={navbarData} />
      </GridItem>
      <GridItem /* colSpan={1}  */ overflowY={{ base: 'auto', lg: 'auto' }}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
