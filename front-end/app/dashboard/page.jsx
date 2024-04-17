"use client";
import getMe from "@/api/getMe";
import Pulse from "@/components/Pulse";
import SideBar from "@/components/SideBar";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashBoard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState(true);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const jsonData = await getMe();
  //     if (!jsonData) {
  //       router.push(`/login?from=${encodeURIComponent(pathname)}`);
  //       return;
  //     }
  //     setAuth(true);
  //   };
  //   fetchData();
  // });
  if (auth)
    return (
      <div>
        <SideBar />
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
