"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Spanner from "@/component/spanner";

const resetpassword = async (data) => {
  return await fetch("http://localhost:8000/api/user/token", {
    credentials: "include",
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleSendVerification = async () => {
    setLoading(true);
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    const obj = {
      token: params.id,
      password: password,
    };

    try {
      const result = await resetpassword(obj);
      const body = await result.json();
      console.log(body);
      if (result.status != 200) {
        setError(body["detail"]);
        return;
      }
      router.push("/login");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    // Here you would implement logic to send verification code to the provided email
    // For demonstration purposes, let's just set a message
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'url("https://www.innovationnewsnetwork.com/wp-content/uploads/2022/09/iStockBilanol-1309634668.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-white font-bold mb-4">Forgot Password</h2>
        <label htmlFor="password" className="block mb-2 text-white">
          Enter new password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your new password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <label htmlFor="confirmPassword" className="block mb-2 text-white">
          Confirm new password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          onClick={handleSendVerification}
          className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
          disabled={loading}
        >
          {loading && <Spanner />}
          {loading ? "" : "Reset Password"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-white mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
