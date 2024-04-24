import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/header-component";
import FooterComponent from "../../components/footer-component";

const Layout = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <HeaderComponent />
      <section className="h-[85vh] py-10 px-2 md:py-28 md:px-60  flex flex-col items-center justify-center">
        <Outlet />
      </section>

      <FooterComponent />
    </div>
  );
};

export default Layout;
