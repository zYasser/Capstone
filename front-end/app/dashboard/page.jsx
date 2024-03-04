"use client";
import getMe from "@/api/getMe";
import SideBar from "@/components/SideBar";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashBoard = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await getMe();
      if (!jsonData) {
        router.push(`/login?from=${encodeURIComponent(pathname)}`);
        return;
      }
    };
    fetchData()
  });
  return (
    <div>
      <SideBar />
    </div>
  );
};

export default DashBoard;
