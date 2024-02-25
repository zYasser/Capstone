"use client";
import React, { useState } from "react";
import Head from "next/head";
import DynamicAlert from "@/components/DynamicAlert";
import isValidEmail from "../../util/isValidEmail";
import isVaildTurkishNumber from "../../util/isVaildTurkishNumber";
import { useRouter } from "next/navigation";
import Spanner from "@/components/Spanner";

const signUp = async (formData) => {
  return await fetch("http://localhost:8000/api/user/register", {
    credentials: "include",
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    country: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(JSON.stringify(formData));
    if (!isValidEmail(formData.email)) {
      setError("Enter valid email");
      setLoading(false);

      return;
    }
    if (!isVaildTurkishNumber(formData.phone)) {
      setError("Enter valid Turksih phone");
      setLoading(false);
      return;
    }
    try {
      // Convert formData to an object
      const formDataObject = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value])
      );

      const result = await signUp(formDataObject);
      const body = await result.json();
      if (result.status != 201) {
        setError(body["detail"]);
        return;
      }
      console.log("askldkas");
      router.push("/login");
    } catch (err) {
      setError("Something went wrong, Try again later");
    } finally {
      setLoading(false);
    }
    setError("");
  };

  return (
    <div>
      <Head>
        <title>Sign-up Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            'url("https://www.innovationnewsnetwork.com/wp-content/uploads/2022/09/iStockBilanol-1309634668.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-slate-50 px-40 py-40 rounded-3xl max-w-md flex flex-col items-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Sign up
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="first_name" className="sr-only">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="last_name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-baseline">
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <div class="m-2">
                  <span className="text-black text-sm bottom-auto">+90</span>
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="date_of_birth" className="sr-only">
                  Date of Birth
                </label>
                <input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Date of Birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="country" className="sr-only">
                  Where do you live
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Where do you live"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-700 "
              >
                {loading && <Spanner />}
                {loading ? "" : "Sign Up"}
              </button>
            </div>
            {error ? <DynamicAlert error={error} /> : ""}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
