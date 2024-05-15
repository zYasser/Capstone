"use client";
import getMyTicket from "@/api/getMyTicket";
import DynamicAlert from "@/components/DynamicAlert";
import Pulse from "@/components/Pulse";
import TicketTable from "@/components/TicketTable";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyTicket = () => {
  const searchParams = useSearchParams();

  let search = searchParams.get("page");
  if (isNaN(search)) {
    return (
      <div className="flex justify-center">
        <DynamicAlert
          error={"Page Query can not contain a character "}
        ></DynamicAlert>
      </div>
    );
  }
  const [currentPage, setCurrentPage] = useState(
    !search ? 1 : parseInt(search)
  );

  const fetchInfo = async (page) => {
    console.log(page);
    const result = await getMyTicket(page);
    if (result.length != 6) {
      setNext(false);
    }
    console.log(result);
    result.pop();
    if (result != null && result.length > 0) {
      setTicket([...ticket, ...result]); // Spread 'result' as well
    }

    setLoading(false);
  };
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState([]);
  const [next, setNext] = useState(true);
  useEffect(() => {
    fetchInfo(currentPage);

    setCurrentPage(currentPage + 1);
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <Pulse />
        </>
      ) : (
        <div className="container mx-auto px-4">
          <TicketTable tickets={ticket} />
          <div className="my-3 flex justify-center">
            {next ? (
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
                onClick={() => {
                  fetchInfo(currentPage);
                  setCurrentPage(currentPage + 1);
                }}
              >
                Show More
              </button>
            ) : (
              ""
            )}{" "}
          </div>
          <div>
            <button className="">

            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MyTicket;
