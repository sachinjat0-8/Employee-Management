import React, { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import { getEmployees } from "../Server/api";
import { useNavigate } from "react-router-dom";

function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
   const navigate = useNavigate();

  // Fetch all employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data); // data is array of employees
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  // Filter employees by search
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Employee Management App
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
       <button
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200"
  onClick={() => navigate("/employee/add")}
>
  + Add Employee
</button>

        <input
          type="text"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="border border-gray-200 rounded-lg p-6 shadow-md bg-white">
        <EmployeeTable employees={filteredEmployees} />
      </div>
    </div>
  );
}

export default EmployeeManagement;
