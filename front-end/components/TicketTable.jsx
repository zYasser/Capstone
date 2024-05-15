import React, { useState } from "react";

const TicketTable = ({ tickets }) => {
  return (
    <div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Ticket ID</th>
            <th className="py-3 px-6 text-left">Topic</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Last Update</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {ticket.id}
              </td>
              <td className="py-3 px-6 text-left">{ticket.topic}</td>
              <td className="py-3 px-6 text-center">{ticket.status? "Open" : "Closed "}</td>
              <td className="py-3 px-6 text-center">{ticket.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
