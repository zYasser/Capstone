"use client";
import DynamicAlert from "@/components/DynamicAlert";
import Pulse from "@/components/Pulse";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const SupportTicket = () => {
  const comment = useRef();
  const [error, setError] = useState();
  const [loadding, setLoadding] = useState(true);
  const [ticketData, setTicketData] = useState();
  const params = useParams();
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const result = await fetch(
          `http://localhost:8000/api/ticket?id=${params.id}`
        );
        const body = await result.json();

        if (result.status !== 200) {
          setError(body["detail"]);
          return;
        }
        console.log(body);

        setTicketData(body);
      } catch (err) {
        console.log(err);
        setError("Something Went Wrong");
      } finally {
        setLoadding(false);
      }
    };

    fetchTicket();
  }, []);

  if (loadding) {
    return <Pulse></Pulse>;
  }
  return (
    <div>
      {error ? (
        <div className=" flex justify-center">
          <DynamicAlert error={error} />
        </div>
      ) : (
        <div className="">
          <div className="flex justify-center my-4">
            <div className="w-4/5">
              <div className="bg-gray-100 rounded-lg shadow-md  p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {ticketData.topic}
                </h2>
                <p className="text-gray-600 mb-2">
                  Sent by: {ticketData.email}
                </p>
                <p className="text-gray-600 mb-4">
                  Date: {ticketData.created_at}
                </p>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-800">{ticketData.body}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-200 p-6 w-4/5">
              <h2 className="text-lg font-bold mb-4">Replay</h2>
              <div className="flex flex-col space-y-4">
                {/* <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold">John Doe</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Posted on April 17, 2023
                  </p>
                  <p className="text-gray-700">
                    This is a sample comment. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </div> */}
                {ticketData.messages.map((i) => {
                  return (
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-bold">{i.user_email}</h3>
                      <p className="text-gray-700 text-sm mb-2">
                        {i.created_at}
                      </p>
                      <p className="text-gray-700">{i.message}</p>
                    </div>
                  );
                })}
              </div>
              <form
                className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-20"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(comment.current.value);
                  comment.current.value = "";
                }}
              >
                <div className="px-3 mb-2 mt-2">
                  <textarea
                    placeholder="comment"
                    className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    ref={comment}
                  ></textarea>
                </div>
                <div className="flex justify-end px-4">
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SupportTicket;
