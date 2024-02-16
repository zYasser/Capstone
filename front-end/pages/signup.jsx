import React, { useState } from "react";
import Head from "next/head";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    location: "",
  });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Reset validation errors when input changes
    if (name === "email") setEmailError("");
    if (name === "phone") setPhoneError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    // Phone number validation
    const phonePattern = /^\d{11}$/; // Change this regex pattern according to your phone number format

    if (!phonePattern.test(formData.phone)) {
      setPhoneError("Please enter a valid phone number");
      return;
    }
    console.log(formData);
    // Add your signup logic here
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
        <div className="bg-black px-40 py-40 rounded-3xl max-w-md flex flex-col items-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign up
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  value={formData.lastName}
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
                  className={`mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${emailError && "border-red-500"}`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mb-2">{emailError}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className={`mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${phoneError && "border-red-500"}`}
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mb-2">{phoneError}</p>
                )}
              </div>
              <div>
                <label htmlFor="dob" className="sr-only">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">
                  Where do you live
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  className="mb-4 appearance-none rounded-none relative block w-80  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Where do you live"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-700 "
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
