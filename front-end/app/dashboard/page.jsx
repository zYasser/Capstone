"use client";
import getMe from "@/api/getMe";
import Pulse from "@/components/Pulse";
import SideBar from "@/components/SideBar";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashBoard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await getMe();
      if (!jsonData) {
        router.push(`/login?from=${encodeURIComponent(pathname)}`);
        return;
      }
      setAuth(true);
    };
    fetchData();
  });
  if (auth)
    return (
      <div>
        <SideBar />
        <div className="flex justify-center mt-24">
          <button
            type="button"
            onClick={() => {
              router.push(`/solution-form`);
            }}
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Generate Solution
          </button>
        </div>
      </div>
    );
  else
    return (
      <div>
        <Pulse></Pulse>
      </div>
    );
};

export default DashBoard;
