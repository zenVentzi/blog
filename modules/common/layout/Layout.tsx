import { Grid, GridItem } from '@chakra-ui/react';
import Sidebar, { SidebarData } from './Sidebar';

type LayoutProps = {
  sidebarData: SidebarData;
  children: React.ReactNode;
};

const Layout = ({ children, sidebarData }: LayoutProps) => {
  return (
    <Grid h="100vh" templateRows="1fr" templateColumns="20% 80%">
      <GridItem rowSpan={1} colSpan={1}>
        <Sidebar sidebarData={sidebarData} />
      </GridItem>
      <GridItem colSpan={1}>{children}</GridItem>
    </Grid>
  );
};

export default Layout;
