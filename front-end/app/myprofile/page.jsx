"use client";

import getMe from "@/api/getMe";
import Pulse from "@/components/Pulse";
import SideBar from "@/components/SideBar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DynamicSucceedAlert from "@/components/DynamicSucceedAlert";
import DynamicAlert from "@/components/DynamicAlert";
import updateAccount from "@/api/updateAccount";
import Spanner from "@/components/Spanner";
import ChangePasswordForm from "@/components/ChangePasswordForm";

const MyProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [fetch, setFetch] = useState(false);
  const [vaild, setValid] = useState("");

  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await getMe();
      if (!jsonData) router.push("/login");
      const {
        first_name,
        last_name,
        email,
        phone,
        street,
        city,
        postal_code,
        district,
      } = jsonData;
      setProfile(jsonData);
      setFormData({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        street: street,
        city: city,
        postal_code: postal_code,
        district: district,
      });
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
  const handleSubmit = async (e) => {
    setFetch(true);
    e.preventDefault();
    const { success, error } = await updateAccount(formData);
    if (success) {
      setError("");
      setValid(success);
    } else if (error) {
      console.log(error);
      setError(error);
      setValid("");
    }
    setFetch(false);
    // Access form data from formData state
    console.log(formData);
    // Here you can perform any further actions such as sending the data to the server
  };

  return (
    <div className="bg-green-200 min-h-screen">
      <div className="container mx-auto w-1/2 px-4 py-8 ">
        <SideBar />
        <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4 shadow-2xl">
          {vaild && <DynamicSucceedAlert message={vaild} />}
          {error && <DynamicAlert error={error} />}
          <form action="handleSubmit" onSubmit={handleSubmit}>
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
                  value={formData.first_name}
                  onChange={handleChange}
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
                  value={formData.last_name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="street"
              >
                Street
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="street"
                type="text"
                placeholder="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="postal-code"
              >
                Postal Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="postal-code"
                type="text"
                placeholder="Postal Code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="district"
              >
                District
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="district"
                type="text"
                placeholder="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 ">
              <div className="flex items-center justify-between flex-row-reverse my-3">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  type="submit"
                  disabled={fetch}
                >
                  {fetch ? <Spanner /> : "Change Information"}
                </button>
              </div>
            </div>
          </form>
          <ChangePasswordForm></ChangePasswordForm>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
