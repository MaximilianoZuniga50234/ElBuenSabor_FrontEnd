import Footer from "./components/footer/Footer";
import NavBar from "./components/nav_bar/NavBar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
