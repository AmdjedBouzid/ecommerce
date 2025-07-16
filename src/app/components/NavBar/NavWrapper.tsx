"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

const hiddenRoutes = ["/Login", "/register"]; // Customize as needed

export default function NavWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const shouldHideNav = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNav && <NavBar />}
      {children}
    </>
  );
}
