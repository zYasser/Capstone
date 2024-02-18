"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import FormData from "form-data";
import isValidEmail from "../util/isVaildTurkishNumber";
import { useRouter } from "next/navigation";
import DynamicAlert from "@/component/DynamicAlert";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const [error, setErrorMessage] = useState("");

  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false); // State to track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setErrorMessage(false);
    // Use async function for asynchronous operation
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    setMessage(null);

    const { username, password } = formData;
    if (isValidEmail(username) == null) {
      setErrorMessage("Enter a correct email");
      setLoading(false); // Set loading to true when the request starts
      return;
    }
    try {
      // Simulate login request (replace with your actual login logic)
      const result = await login(username, password);
      setFormData({ username: "", password: "" });
      setLoading(false);
      if (result.status != 200) {
        setErrorMessage("Your email and password doesn't match");
        return;
      }
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false); // Set loading to false in case of error
      setErrorMessage("Something went wrong, Please try again later ");
    }
  };

  // Simulated login function (replace with actual login logic)
  const login = async (username, password) => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);

    return await fetch("http://localhost:8000/api/user/login", {
      credentials: "include",
      method: "POST",
      mode: "cors",
      body: data,
    });
  };

  return (
    <div className="">
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage: `url('https://www.innovationnewsnetwork.com/wp-content/uploads/2022/09/iStockBilanol-1309634668.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" bg-slate-100 px-20 py-40 rounded-3xl max-w-md flex flex-col items-center">
          <img
            className="rounded-full w-60 h-60 mb-8"
            src="https://static.vecteezy.com/system/resources/thumbnails/003/067/839/small/eco-green-leaf-icon-in-light-bulb-free-vector.jpg"
            alt="image description"
          />

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="email"
              className="w-80 px-4 py-2 mb-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 text-black"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-80 px-4 py-2 mb-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 text-black"
              required
            />
            {message && <p className="text-black mt-4">{message}</p>}
            <div className="text-sm font-white text-right w-80 mb-2 text-black ">
              <Link href="/forget-password" className="hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-40 md:w-2/3 bg-green-400  text-white py-2 px-15 rounded-3xl hover:bg-green-200 focus:outline-none focus:bg-green-700 relative"
              disabled={loading} // Disable button when loading
            >
              {loading && (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-green-300 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                </div>
              )}
              {loading ? "" : "Login"}
            </button>
            <div className="flex justify-center items-center text-sm text-black font-white text-right w-80 mt-2 pb-3">
              <h2 className="mr-1">Don't have an account?</h2>
              <Link
                href="/signup"
                className="hover:underline text-blue-500 underline"
              >
                Create account
              </Link>
            </div>
            {error ? <DynamicAlert error={error} /> : ""}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
