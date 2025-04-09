import { Employee } from "../models/Employee.js";
// Create Employee
// export const createEmployee = async (req, res) => {
//   try {
//       const { name, email, address, experience, lastCompany, joiningDate, resignationDate } = req.body;
      
//       if (!name || !email || !address || !experience || !lastCompany || !joiningDate || !resignationDate) {
//           return res.status(400).json({
//               message: "All fields, including joining and resignation dates, are required",
//               success: false
//           });
//       }

//       const numericExperience = Number(experience);
//       if (isNaN(numericExperience)) {
//           return res.status(400).json({
//               message: "Experience must be a valid number",
//               success: false
//           });
//       }

//       const joinDate = new Date(joiningDate);
//       const resignDate = new Date(resignationDate);

//       if (isNaN(joinDate) || isNaN(resignDate)) {
//           return res.status(400).json({
//               message: "Invalid date format for joining or resignation date",
//               success: false
//           });
//       }

//       if (resignDate <= joinDate) {
//           return res.status(400).json({
//               message: "Resignation date must be after the joining date",
//               success: false
//           });
//       }

//       const newEmployee = await Employee.create({
//           name,
//           email,
//           address,
//           experience: numericExperience,
//           lastCompany,
//           joiningDate: joinDate,
//           resignationDate: resignDate
//       });

//       return res.status(201).json({
//           message: "Employee created successfully!",
//           success: true,
//           employee: newEmployee
//       });
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({
//           message: "Internal Server Error",
//           success: false,
//           error: error.message
//       });
//   }
// };
// export const createEmployee = async (req, res) => {
//     try {
//         const { name, email, address, experience, lastCompany, joiningDate, resignationDate } = req.body;
//         const userId = req.id; // ✅ Get logged-in user ID
//         if (!name || !email || !address || !experience || !lastCompany || !joiningDate) {
//             return res.status(400).json({
//                 message: "All required fields must be provided",
//                 success: false
//             });
//         }
  
//         const numericExperience = Number(experience);
//         if (isNaN(numericExperience)) {
//             return res.status(400).json({
//                 message: "Experience must be a valid number",
//                 success: false
//             });
//         }
  
//         const joinDate = new Date(joiningDate);
//         let resignDate = null;
        
//         if (resignationDate) {
//             resignDate = new Date(resignationDate);
//             if (isNaN(resignDate)) {
//                 return res.status(400).json({
//                     message: "Invalid date format for resignation date",
//                     success: false
//                 });
//             }
//             if (resignDate <= joinDate) {
//                 return res.status(400).json({
//                     message: "Resignation date must be after the joining date",
//                     success: false
//                 });
//             }
//         }
  
//         const newEmployee = await Employee.create({
//             name,
//             email,
//             address,
//             experience: numericExperience,
//             lastCompany,
//             joiningDate: joinDate,
//             resignationDate: resignDate,
//             createdBy: userId // ✅ Store logged-in user's ID
//         });
  
//         return res.status(201).json({
//             message: "Employee created successfully!",
//             success: true,
//             employee: newEmployee
//         });
//     } catch (error) {
//         console.error("Error creating employee:", error);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//             error: error.message
//         });
//     }
// };
export const createEmployee = async (req, res) => {
    try {
        const { name, email, address, experience, lastCompany, joiningDate, resignationDate } = req.body;
        const userId = req.id; // ✅ Get logged-in user ID

        if (!name || !email || !address || !experience || !lastCompany || !joiningDate) {
            return res.status(400).json({
                message: "All required fields must be provided",
                success: false
            });
        }

        // ✅ Convert experience to a number and validate
        const numericExperience = Number(experience);
        if (isNaN(numericExperience) || numericExperience < 0) {
            return res.status(400).json({
                message: "Experience must be a valid non-negative number",
                success: false
            });
        }

        // ✅ Validate dates
        const joinDate = new Date(joiningDate);
        let resignDate = null;

        if (resignationDate) {
            resignDate = new Date(resignationDate);
            if (isNaN(resignDate)) {
                return res.status(400).json({
                    message: "Invalid date format for resignation date",
                    success: false
                });
            }
            if (resignDate <= joinDate) {
                return res.status(400).json({
                    message: "Resignation date must be after the joining date",
                    success: false
                });
            }
        }

        // ✅ Create employee in the database
        const newEmployee = await Employee.create({
            name,
            email,
            address,
            experience: numericExperience,
            lastCompany,
            joiningDate: joinDate,
            resignationDate: resignDate,
            createdBy: userId // ✅ Store logged-in user's ID
        });

        return res.status(201).json({
            message: "Employee created successfully!",
            success: true,
            employee: newEmployee
        });
    } catch (error) {
        console.error("Error creating employee:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

  
// Get All Employees
// export const getAllEmployees = async (req, res) => {
//   try {
//       const employees = await Employee.find();

//       if (employees.length === 0) {
//           return res.status(404).json({
//               message: "No employees found",
//               success: false
//           });
//       }

//       return res.status(200).json({
//           message: "Employees fetched successfully!",
//           success: true,
//           employees
//       });
//   } catch (error) {
//       console.error("Error fetching employees:", error);
//       return res.status(500).json({
//           message: "Internal Server Error",
//           success: false,
//           error: error.message
//       });
//   }
// };
export const getAllEmployees = async (req, res) => {
    try {
        const userId = req.id; // ✅ Get logged-in user's ID
  
        const employees = await Employee.find({ createdBy: userId });
  
        if (employees.length === 0 || employees.length === null) {
            return res.status(404).json({
                message: "No employees found for this user",
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

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, address, experience, lastCompany, joiningDate, resignationDate } = req.body;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false,
            });
        }

        if (!name || !email || !address || !experience || !lastCompany || !joiningDate) {
            return res.status(400).json({
                message: "All required fields must be provided",
                success: false,
            });
        }

        const numericExperience = Number(experience);
        if (isNaN(numericExperience)) {
            return res.status(400).json({
                message: "Experience must be a valid number",
                success: false,
            });
        }

        // ✅ Validate joiningDate format
        const joinDate = new Date(joiningDate);
        if (isNaN(joinDate.getTime())) {
            return res.status(400).json({
                message: "Invalid date format for joining date",
                success: false,
            });
        }

        let resignDate = employee.resignationDate || null;

        // ✅ Validate resignationDate only if provided
        if (resignationDate) {
            const tempResignDate = new Date(resignationDate);
            if (isNaN(tempResignDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid date format for resignation date",
                    success: false,
                });
            }
            resignDate = tempResignDate;
        }

        // ✅ Ensure resignation date is after joining date (if provided)
        if (resignDate && resignDate <= joinDate) {
            return res.status(400).json({
                message: "Resignation date must be after the joining date",
                success: false,
            });
        }

        // ✅ Track Changes and Store History
        const historyEntries = [];
        const updatedFields = {
            name,
            email,
            address,
            experience: numericExperience,
            lastCompany,
            joiningDate: joinDate,
            resignationDate: resignDate || null,
        };
        for (const key in updatedFields) {
            let oldValue = employee[key];
            let newValue = updatedFields[key];
            // 🛠 Fix: Convert dates to YYYY-MM-DD format for accurate comparison
            if (key === "joiningDate" || key === "resignationDate") {
                oldValue = oldValue ? new Date(oldValue).toISOString().split("T")[0] : null;
                newValue = newValue ? new Date(newValue).toISOString().split("T")[0] : null;
            }
            // 🔥 Only save history if values actually change
            if (oldValue !== newValue) {
                historyEntries.push({
                    field: key,
                    oldValue: oldValue,
                    newValue: newValue,
                    date: new Date(),
                });
            }
        }
        // ✅ Only update if there are actual changes
        if (historyEntries.length > 0) {
            employee.history.push(...historyEntries);
            Object.assign(employee, updatedFields);
            await employee.save();
        }
        return res.status(200).json({
            message: "Employee updated successfully!",
            success: true,
            employee,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
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

