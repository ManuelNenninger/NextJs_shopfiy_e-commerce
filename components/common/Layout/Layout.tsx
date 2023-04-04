import { FC } from "react";
import s from "./Layout.module.css";
import { Footer, Navbar } from "@components/common";
import { Sidebar } from "@components/ui";
import { CartSidebar } from "@components/cart";
import { useUI } from "@components/ui/context";
import { ApiProvider } from "@framework";

interface LayoutProps {
  children?: React.ReactNode[] | React.ReactNode;
  layout?: "A" | "B";
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useUI();
  console.log("Re-rendering LAYOUT");

  return (
    <>
      <ApiProvider>
        <div className={s.root}>
          <Navbar />
          <Sidebar onClose={closeSidebar} isOpen={isSidebarOpen}>
            {" "}
            <CartSidebar />
          </Sidebar>
          <main className="fit">{children}</main>
          <Footer />
        </div>
      </ApiProvider>
    </>
  );
};

export default Layout;
