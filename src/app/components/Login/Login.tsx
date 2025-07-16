"use client";

import React, { useState } from "react";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <form
        className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col gap-6"
        onSubmit={(e) =>
          login(email, password, setLoading, e, setError, router, setUser)
        }
      >
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1 text-center">
          Login
        </h2>
        <p className="text-gray-500 text-center mb-2">
          Sign in to your account
        </p>

        {error && <p className="text-red-600 text-center text-sm">{error}</p>}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-50 text-gray-900 placeholder-gray-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-50 text-gray-900 placeholder-gray-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-2 rounded-lg border-2 border-primary text-white font-semibold text-lg bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
