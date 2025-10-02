const Employee = require("../models/EmployeeManagement");
const fs = require("fs");
const path = require("path");


const createEmployee = async (req, res) => {
 try {
    const { name, email, phone, department, salary } = req.body;

    if (!name || !email || !phone || !department || !salary) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Only save the file name, multer already saved the file to disk
    const profileImage = req.file ? req.file.filename : null;

    const newEmployee = await Employee.create({
      name,
      email,
      phone,
      department,
      salary,
      profileImage,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllData = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findById(id);

    if (!emp) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, data: emp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getEmployeeDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findByIdAndDelete(id);

    if (!emp) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, data: emp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const UpdateData = async (req, res) => {
  try {
    const { id } = req.params;

    let updateFields = { ...req.body };
    if (req.file) {
      updateFields.profileImage = req.file.filename;
    }

    const updated = await Employee.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use another one.",
      });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createEmployee,
  fetchAllData,
  getEmployeeById,
  getEmployeeDelete,
  UpdateData,
};
