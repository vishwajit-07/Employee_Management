import { Employee } from "../models/Employee.js";
// Create Employee
export const createEmployee = async (req, res) => {
  try {
      const { name, email, address, experience, lastCompany, joiningDate, resignationDate } = req.body;
      
      if (!name || !email || !address || !experience || !lastCompany || !joiningDate || !resignationDate) {
          return res.status(400).json({
              message: "All fields, including joining and resignation dates, are required",
              success: false
          });
      }

      const numericExperience = Number(experience);
      if (isNaN(numericExperience)) {
          return res.status(400).json({
              message: "Experience must be a valid number",
              success: false
          });
      }

      const joinDate = new Date(joiningDate);
      const resignDate = new Date(resignationDate);

      if (isNaN(joinDate) || isNaN(resignDate)) {
          return res.status(400).json({
              message: "Invalid date format for joining or resignation date",
              success: false
          });
      }

      if (resignDate <= joinDate) {
          return res.status(400).json({
              message: "Resignation date must be after the joining date",
              success: false
          });
      }

      const newEmployee = await Employee.create({
          name,
          email,
          address,
          experience: numericExperience,
          lastCompany,
          joiningDate: joinDate,
          resignationDate: resignDate
      });

      return res.status(201).json({
          message: "Employee created successfully!",
          success: true,
          employee: newEmployee
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          message: "Internal Server Error",
          success: false,
          error: error.message
      });
  }
};


// Get All Employees
export const getAllEmployees = async (req, res) => {
  try {
      const employees = await Employee.find();

      if (employees.length === 0) {
          return res.status(404).json({
              message: "No employees found",
              success: false
          });
      }

      return res.status(200).json({
          message: "Employees fetched successfully!",
          success: true,
          employees
      });
  } catch (error) {
      console.error("Error fetching employees:", error);
      return res.status(500).json({
          message: "Internal Server Error",
          success: false,
          error: error.message
      });
  }
};


// Get Employee by ID
export const getEmployeeById = async (req, res) => {
  try {
      const { id } = req.params;

      const employee = await Employee.findById(id);

      if (!employee) {
          return res.status(404).json({
              message: "Employee not found",
              success: false
          });
      }

      return res.status(200).json({
          message: "Employee fetched successfully!",
          success: true,
          employee
      });
  } catch (error) {
      console.error("Error fetching employee:", error);
      return res.status(500).json({
          message: "Internal Server Error",
          success: false,
          error: error.message
      });
  }
};


// Update Employee
export const updateEmployee = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, email, address, experience, lastCompany, joiningDate, resignationDate } = req.body;

      const employee = await Employee.findById(id);
      if (!employee) {
          return res.status(404).json({
              message: "Employee not found",
              success: false
          });
      }

      if (!name || !email || !address || !experience || !lastCompany || !joiningDate || !resignationDate) {
          return res.status(400).json({
              message: "All fields are required",
              success: false
          });
      }

      const numericExperience = Number(experience);
      if (isNaN(numericExperience)) {
          return res.status(400).json({
              message: "Experience must be a valid number",
              success: false
          });
      }

      const joinDate = new Date(joiningDate);
      const resignDate = new Date(resignationDate);

      if (isNaN(joinDate) || isNaN(resignDate)) {
          return res.status(400).json({
              message: "Invalid date format for joining or resignation date",
              success: false
          });
      }

      if (resignDate <= joinDate) {
          return res.status(400).json({
              message: "Resignation date must be after the joining date",
              success: false
          });
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          { name, email, address, experience: numericExperience, lastCompany, joiningDate: joinDate, resignationDate: resignDate },
          { new: true }
      );

      return res.status(200).json({
          message: "Employee updated successfully!",
          success: true,
          employee: updatedEmployee
      });
  } catch (error) {
      console.error("Error updating employee:", error);
      return res.status(500).json({
          message: "Internal Server Error",
          success: false,
          error: error.message
      });
  }
};


// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
      const { id } = req.params;

      const employee = await Employee.findById(id);
      if (!employee) {
          return res.status(404).json({
              message: "Employee not found",
              success: false
          });
      }

      await Employee.findByIdAndDelete(id);

      return res.status(200).json({
          message: "Employee deleted successfully!",
          success: true
      });
  } catch (error) {
      console.error("Error deleting employee:", error);
      return res.status(500).json({
          message: "Internal Server Error",
          success: false,
          error: error.message
      });
  }
};

