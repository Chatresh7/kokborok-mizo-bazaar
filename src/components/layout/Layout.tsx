import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
