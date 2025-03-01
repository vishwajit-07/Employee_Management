import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", email: "johndoe@example.com", address: "New York, USA", lastCompany: "ABC Corp", joiningDate: "2022-03-01", resignationDate: "2024-01-01" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", address: "Los Angeles, USA", lastCompany: "XYZ Ltd", joiningDate: "2021-07-15", resignationDate: "2023-12-10" },
  ]);

  const navigate = useNavigate();

  const handleOpen = () => {
    navigate("/add-employee"); // Navigate to EmployeeForm route
  };

  return (
    <Container maxWidth="lg">
      <Navbar />
      
      {/* Add Employee Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 10, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Employee
        </Button>
      </Box>

      {/* Employee Details Heading */}
      <Typography 
        variant="h5" 
        align="center" 
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Employee's Details
      </Typography>

      {/* Employee Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Last Company</strong></TableCell>
              <TableCell><strong>Joining Date</strong></TableCell>
              <TableCell><strong>Resignation Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.lastCompany}</TableCell>
                <TableCell>{employee.joiningDate}</TableCell>
                <TableCell>{employee.resignationDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
