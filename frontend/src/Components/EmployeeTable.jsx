import React from "react";
import { Link } from "react-router-dom";

function EmployeeTable({ employees }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-md bg-white">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4 text-blue-600 underline">
                  <Link to={`/employee/${emp._id}`}>{emp.name}</Link>
                </td>
                <td className="py-3 px-4">{emp.email}</td>
                <td className="py-3 px-4">{emp.phone}</td>
                <td className="py-3 px-4">{emp.department}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
