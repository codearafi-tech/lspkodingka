import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar.tsx"
import Footer from "../ui/Footer.tsx";

export default function PublicLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />

    </>
  );
}