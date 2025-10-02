import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // match your backend
});

// Get all employees
export const getEmployees = () => API.get("/employee");

// Get single employee by ID
export const getEmployeeById = (id) => API.get(`/employee/${id}`);




export const createEmployee = (employeeData) =>
  API.post("/employee", employeeData);
