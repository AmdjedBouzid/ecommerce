// components/AdminGuard.tsx
"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function AdminGuard({ children }: Props) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/"); // Redirect to login
    } else {
      setIsAuthorized(true); // Allow access
    }
  }, []);

  if (!isAuthorized) {
    return <div>Loading...</div>; // Or a spinner
  }

  return <>{children}</>;
}
