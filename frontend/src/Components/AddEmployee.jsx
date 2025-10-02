import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// --- Helper SVG Icon Components for a professional look ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const DepartmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const SalaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;


function AddEmployee() {
  // --- LOGIC - NO CHANGES HERE ---
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });
      const res = await axios.post("http://localhost:8000/api/employee", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee added successfully!");
      navigate("/"); // redirect to main employee page
    } catch (err) {
      console.error("Error adding employee:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.error || err.response.data.message || "Something went wrong");
      } else {
        setError("Server not responding");
      }
    }
  };

  // --- UI / JSX - ALL CHANGES ARE BELOW ---
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex justify-center items-center p-4">
      <div className="w-full max-w-lg">
        {/* Form Header */}
        <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 py-2">
                Add New Employee
            </h1>
            <p className="text-slate-400">Fill in the details to add a new team member.</p>
        </header>

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {error && <p className="bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-center p-3 mb-6">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Field with Icon */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <UserIcon />
                    </div>
                    <input
                        type="text" name="name" placeholder="Full Name" required onChange={handleChange}
                        className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg pl-10 pr-4 py-3 text-slate-100 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <EmailIcon />
                    </div>
                    <input
                        type="email" name="email" placeholder="Email Address" required onChange={handleChange}
                        className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg pl-10 pr-4 py-3 text-slate-100 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <PhoneIcon />
                    </div>
                    <input
                        type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange}
                        className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg pl-10 pr-4 py-3 text-slate-100 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <DepartmentIcon />
                    </div>
                    <input
                        type="text" name="department" placeholder="Department" required onChange={handleChange}
                        className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg pl-10 pr-4 py-3 text-slate-100 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <SalaryIcon />
                    </div>
                    <input
                        type="number" name="salary" placeholder="Salary" required onChange={handleChange}
                        className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg pl-10 pr-4 py-3 text-slate-100 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>

                {/* Custom File Input */}
                <div>
                    <label htmlFor="profileImage" className="block text-sm font-medium text-slate-300 mb-2">Profile Image</label>
                    <label htmlFor="profileImage" className="group flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700/50 hover:border-blue-500 transition-colors">
                        <div className="text-center">
                            <UploadIcon />
                            <p className="mt-2 text-sm text-slate-400">
                                <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
                            </p>
                            {formData.profileImage && <p className="text-xs text-slate-500 mt-1">{formData.profileImage.name}</p>}
                        </div>
                        <input id="profileImage" name="profileImage" type="file" className="sr-only" onChange={handleChange} />
                    </label>
                </div>
                
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold transition-transform hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                    Add Employee
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
