"use client";
import { ToastContainer } from "react-toastify";
// app/layout.tsx
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { Inter } from "next/font/google";
import NavWrapper from "./components/NavBar/NavWrapper";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="pt-16">
        <UserProvider>
          <NavWrapper>
            <ToastContainer 
              position="top-center" 
              autoClose={3000}
              theme="light"
            />
            {children}
          </NavWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
