import { useEffect, useState } from "react";
import axios from "axios";
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
  MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/employees");
      setEmployees(res.data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleView = () => {
    if (selectedEmployee) {
      navigate(`/employee/${selectedEmployee._id}`);
    }
    handleMenuClose();
  };

  const handleUpdate = () => {
    if (selectedEmployee) {
      navigate(`/employee/update/${selectedEmployee._id}`);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedEmployee) {
      try {
        await axios.delete(`http://localhost:5000/employee/delete/${selectedEmployee._id}`);
        fetchEmployees(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
    handleMenuClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Joining Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp._id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.experience}</TableCell>
              <TableCell>{new Date(emp.joiningDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleMenuOpen(event, emp)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleView}>View</MenuItem>
                  <MenuItem onClick={handleUpdate}>Update</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
