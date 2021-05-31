type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      Layout <br />
      {children}
    </div>
  );
};

export default Layout;
