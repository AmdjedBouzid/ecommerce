"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { linksLit } from "@/utils/constants";
import { User, ShoppingCart, Menu } from "lucide-react";
import NavBarMenu from "./NavBarMenu";
import AuthButton from "@/app/components/NavBar/AuthButton";
import ProfileImg from "./ProfileImg";
import { useUser } from "@/context/UserContext";
import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { userRole } from "@/utils/enums/userRoleUnum";
import { Link as LinkType } from "@/utils/types/link";
import CartModal from "../Cart/CartModal";

const NavBar = () => {
  const [MobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, cart } = useUser();
  const [cartOpen, setCartOpen] = useState(false);
  const route = useRouter();
  const path = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    route.push("/Login");
  };

  const handleSectionClick = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const AdminLink: LinkType = {
    name: "Administration",
    to: "/Admin/Products",
  };

  const isAdminPage = path.startsWith("/Admin");

  let navigationLinks: LinkType[] = [];

  if (isAdminPage) {
    navigationLinks = [{ name: "Home", to: "/" }, AdminLink];
  } else {
    navigationLinks = [...linksLit];
    if (user?.role === userRole.ADMIN) {
      navigationLinks.push(AdminLink);
    }
  }

  return (
    <nav className="w-full flex items-center justify-between px-6 lg:px-16 py-3 fixed top-0 left-0 z-50 transition-all duration-300 backdrop-blur-md h-20 shadow-lg border-b border-gray-200 bg-gray-50/95">
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-[160px] animate-none">
        <Link
          href="/"
          className="font-black text-2xl tracking-wider text-gray-800 select-none hover:scale-105 transition-transform duration-200 logo-gradient"
          style={{
            letterSpacing: "0.12em",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AMDJED SHOP
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {navigationLinks.map((item, key) => (
          <li key={key}>
            {item.to.startsWith("#") ? (
              <button
                onClick={() => handleSectionClick(item.to)}
                className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full transition-all duration-200 relative group font-medium ${
                  path === item.to
                    ? "bg-primary/10 text-primary shadow-md"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-1/2 -bottom-1 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4 ${
                    path === item.to ? "w-1/2 left-1/4" : ""
                  }`}
                ></span>
              </button>
            ) : (
              <Link
                href={item.to}
                className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full transition-all duration-200 relative group font-medium ${
                  path === item.to
                    ? "bg-primary/10 text-primary shadow-md"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-1/2 -bottom-1 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4 ${
                    path === item.to ? "w-1/2 left-1/4" : ""
                  }`}
                ></span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Right Side: Cart + Auth/Profile */}
      <div className="flex items-center gap-4 min-w-[200px] justify-end">
        <button
          className="relative p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-primary/10 transition-all duration-200 group border border-gray-200 cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
        >
          <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors duration-200" />
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow animate-none border-2 border-white">
            {cart.length}
          </span>
        </button>

        {user ? (
          <ProfileImg path={user.profileImg} />
        ) : (
          <AuthButton
            name="Login"
            handle={handleLogin}
            icon={User}
            className="max-sm:hidden"
          />
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200 animate-none border border-gray-200"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-7 h-7 text-gray-700" />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {MobileOpen && (
          <NavBarMenu
            setMobileOpen={setMobileOpen}
            items={navigationLinks}
            authBtnProps={{
              name: "Login",
              handle: handleLogin,
              icon: User,
            }}
          />
        )}
      </AnimatePresence>
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default NavBar;
