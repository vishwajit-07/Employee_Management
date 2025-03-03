import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import EmployeeTable from "../EmployeeTable";

const Dashboard = () => {
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
      <EmployeeTable/>
    </Container>
  );
};

export default Dashboard;
