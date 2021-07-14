import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Sidebar, { SidebarData } from './Sidebar';

type LayoutProps = {
  sidebarData: SidebarData;
  children: React.ReactNode;
};

const Layout = ({ children, sidebarData }: LayoutProps) => {
  // if wider than x then have sidebar
  return (
    <Grid
      h="100vh"
      templateRows={{ base: '1fr 1fr', lg: '1fr' }}
      templateColumns={{ base: '1fr', lg: '25% 75%' }}
    >
      {/* <Grid h="100vh" templateRows="1fr" templateColumns="20% 80%"> */}
      <GridItem /* rowSpan={1} colSpan={1} */>
        <Sidebar sidebarData={sidebarData} />
      </GridItem>
      <GridItem /* colSpan={1}  */ overflowY={{ lg: 'scroll' }}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
