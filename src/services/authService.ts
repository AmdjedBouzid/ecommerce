import axiosInstance from "@/utils/Interceptor";
import { User } from "@/utils/types/user";

export async function login(
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  e: React.FormEvent,
  setError: React.Dispatch<React.SetStateAction<string>>,
  router: any,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) {
  e.preventDefault();
  setLoading(true);
  setError(""); // Clear any previous error

  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (response.status === 201) {
      setUser(response.data.user);
      window.localStorage?.setItem("accessToken", response.data.accessToken);

      // Optional: Redirect after successful login
      if (router) {
        router.push("/"); // Change route as needed
      }
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      setError(error.response.data.message);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
}

export async function getCurrentUser(
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setLoading(true);
    const response = await axiosInstance.get("/auth/users/me");
    if (response.status === 200) {
      setUser(response.data);
    } else {
      setUser(null);
    }
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    setUser(null);
  } finally {
    setLoading(false);
  }
}
