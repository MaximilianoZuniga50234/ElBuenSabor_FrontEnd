import NavBar from "./components/nav_bar/NavBar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
