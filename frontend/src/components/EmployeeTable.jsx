import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFetchEmployees from "../hooks/useFetchAllEmployees.jsx";
import { toast } from "sonner";
import { setEmployees } from "../redux/employeeSlice.js";
import { styled } from "@mui/system";

// ✅ Glassmorphic styled TableContainer
const GlassTableContainer = styled(TableContainer)({
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "12px",
  boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.5)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
});

const GlassTable = styled(Table)({
  "& th, & td": {
    padding: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    color: "#222",
  },
  "& th": {
    background: "rgba(255, 255, 255, 0.4)",
    fontWeight: "bold",
  },
});

const EmployeeTable = ({ setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar }) => {
  useFetchEmployees();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees = [], error } = useSelector((store) => store.employees);
  const [filterEmployees, setFilterEmployees] = useState([]);

  useEffect(() => {
    setFilterEmployees(employees);
  }, [employees]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleView = () => {
    if (selectedEmployee) navigate(`/employee/${selectedEmployee._id}`);
    handleMenuClose();
  };

  const handleUpdate = () => {
    if (selectedEmployee) navigate(`/employee/update/${selectedEmployee._id}`);
    handleMenuClose();
  };

  const handleDelete = async (empId) => {
    if (!selectedEmployee) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/employee/delete/${empId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        const updatedEmployees = filterEmployees.filter(
          (employee) => employee._id !== empId
        );
        setFilterEmployees(updatedEmployees);
        dispatch(setEmployees(updatedEmployees));
        setSnackbarMessage("Employee deleted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage("Server problem while deleting employee.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee.");
    }

    handleMenuClose();
  };

  return (
    <GlassTableContainer component={Paper}>
      {error && <Alert severity="error">{error}</Alert>}
      {!error && filterEmployees.length === 0 && (
        <Alert severity="info">No employees found</Alert>
      )}
      {!error && filterEmployees.length > 0 && (
        <GlassTable>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Previous/Current Company</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Resign Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterEmployees.map((emp, index) => (
              <TableRow key={emp._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.address}</TableCell>
                <TableCell>{emp.experience || "Fresher"}</TableCell>
                <TableCell>{emp.lastCompany}</TableCell>
                <TableCell>{new Date(emp.joiningDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(emp.resignationDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, emp)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{
                      "& .MuiPaper-root": {
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 255, 255, 0.4)",
                        boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.5)",
                        borderRadius: "10px",
                      },
                      "& .MuiMenuItem-root": {
                        color: "#222",
                        fontWeight: "bold",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.3)",
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleView}>View history</MenuItem>
                    <MenuItem onClick={handleUpdate}>Update</MenuItem>
                    <MenuItem onClick={() => handleDelete(emp._id)}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </GlassTable>
      )}
    </GlassTableContainer>
  );
};

export default EmployeeTable;
