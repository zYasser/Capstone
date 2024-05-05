"use client";
import Link from "next/link";
import React, { useState } from "react";
const Support = () => {
  const [completedEmails, setCompletedEmails] = useState([]);

  const emails = [
    {
      id: 1,
      username: "john_doe",
      topic: "New Product Launch",
      updated_at: "2024-05-04 10:25:00",
      created_at: "2024-05-03 14:30:00",
    },
    {
      id: 2,
      username: "jane_smith",
      topic: "Marketing Campaign",
      updated_at: "2024-05-03 16:45:00",
      created_at: "2024-05-02 09:15:00",
    },
    {
      id: 3,
      username: "alex_johnson",
      topic: "Team Meeting Agenda",
      updated_at: "2024-05-02 12:00:00",
      created_at: "2024-05-01 18:30:00",
    },
    {
      id: 4,
      username: "emily_wilson",
      topic: "Quarterly Report",
      updated_at: "2024-05-01 09:00:00",
      created_at: "2024-04-30 16:15:00",
    },
    {
      id: 5,
      username: "michael_brown",
      topic: "New Hire Training",
      updated_at: "2024-04-30 14:30:00",
      created_at: "2024-04-29 10:45:00",
    },
    {
      id: 6,
      username: "sarah_davis",
      topic: "Customer Support Feedback",
      updated_at: "2024-04-28 11:00:00",
      created_at: "2024-04-27 15:20:00",
    },
    {
      id: 7,
      username: "david_miller",
      topic: "Project Kickoff Meeting",
      updated_at: "2024-04-27 09:30:00",
      created_at: "2024-04-26 13:45:00",
    },
    {
      id: 8,
      username: "jessica_wilson",
      topic: "Website Redesign",
      updated_at: "2024-04-26 16:00:00",
      created_at: "2024-04-25 11:15:00",
    },
    {
      id: 9,
      username: "robert_taylor",
      topic: "Sales Strategy Meeting",
      updated_at: "2024-04-25 14:15:00",
      created_at: "2024-04-24 10:30:00",
    },
    {
      id: 10,
      username: "amanda_brown",
      topic: "IT Infrastructure Updates",
      updated_at: "2024-04-24 10:00:00",
      created_at: "2024-04-23 15:45:00",
    },
  ];
  const markAsComplete = (id) => {
    setCompletedEmails([...completedEmails, id]);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Topic</th>
              <th className="py-3 px-6 text-left">Updated At</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {emails.map((email) => (
              <tr
                key={email.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{email.username}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>{email.topic}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>{email.updated_at}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>{email.created_at}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <Link href={`/support/${email.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                        View
                      </button>
                    </Link>
                    {!completedEmails.includes(email.id) && (
                      <button
                        onClick={() => markAsComplete(email.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Mark as Complete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Support;
