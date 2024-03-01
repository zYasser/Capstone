"use client";

import getMe from "@/api/getMe";
import Pulse from "@/components/Pulse";
import SideBar from "@/components/SideBar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getMe();
      if (!result) router.push("/login");
      console.log(result);
      setProfile(result);
    };
    fetchData();
  }, []);
  if (!profile) {
    return <Pulse />;
  }

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Access form data from formData state
    console.log(formData);
    // Here you can perform any further actions such as sending the data to the server
  };

  return (
    <div className="bg-green-200 min-h-screen">
      <div className="container mx-auto w-1/2 px-4 py-8 ">
        <SideBar />
        <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4 shadow-2xl">
          <form action="handleSubmit">
            <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name"
                  type="text"
                  placeholder="First Name"
                  value={profile.first_name}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="last-name"
                  type="text"
                  placeholder="Last Name"
                  value={profile.last_name}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={profile.email}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  placeholder="+90 (___) ___-____"
                  pattern="\+90 \([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                  value={profile.phone}
                />
              </div>
            </div>
            <div className="mb-4 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                rows="3"
                placeholder="Address"
                value={`${profile.city} , ${profile.street}`}
              ></textarea>
              <div className="flex items-center justify-between flex-row-reverse my-3">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  type="submit"
                >
                  Change Information
                </button>
              </div>
            </div>
          </form>

          <div className="flex items-center justify-between my-10"></div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-4">Change Password</h1>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="current-password"
            >
              Current Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="current-password"
              type="password"
              placeholder="Current Password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="new-password"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="new-password"
              type="password"
              placeholder="New Password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="Confirm New Password"
            />
          </div>

          <div className="flex items-center justify-between flex-row-reverse">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
              type="button"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
