import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { userRole } from "@/utils/enums/userRoleUnum";

export const useAdminGuard = (state: boolean) => {
  const router = useRouter();
  const { user, loading } = useUser(); // optional: support loading state

  useEffect(() => {
    // Optional guard to avoid flashing before loading is done
    if (loading) return;

    if (user?.role !== userRole.ADMIN) {
      router.push("/Login");
    }
  }, [user, loading]); // include `loading` if using
};

export const useAuthGuard = (state: boolean) => {
  const router = useRouter();
  const { user, loading } = useUser(); // optional: support loading state

  useEffect(() => {
    // Optional guard to avoid flashing before loading is done
    if (loading) return;

    if (user?.role !== userRole.ADMIN) {
      router.push("/Login");
    }
  }, [user, loading]); // include `loading` if using
};
