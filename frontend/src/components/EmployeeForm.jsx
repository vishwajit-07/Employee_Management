import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./pages/Navbar";

const EmployeeForm = ({ employee, onClose }) => {
    const [formData, setFormData] = useState({
        name: "", email: "", address: "", lastCompany: "", joiningDate: "", resignationDate: "",
    });
    const navigate = useNavigate();

    useEffect(() => { if (employee) setFormData(employee); }, [employee]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleClose = () => {
        navigate("/dashboard"); // Navigate back to Dashboard
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
            console.error("No token found. Please log in again.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/employee/add", formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Ensure "Bearer" is included
                },
                withCredentials: true // Allow cookies to be sent
            });

            console.log("Employee Added:", res.data);
            navigate("/dashboard"); // Redirect after success
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    };




    return (
        <>
            <Navbar />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    margin: "auto",
                    mt: 8, // Space between Navbar and Form
                    padding: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5 // Space between fields
                }}
            >
                <Box sx={{ textAlign: "center" }}>
                    <h2>Employee Form</h2>
                </Box>
                <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} required />
                <TextField label="Email" name="email" type="email" fullWidth value={formData.email} onChange={handleChange} required />
                <TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} required />
                <TextField label="Last Company" name="lastCompany" fullWidth value={formData.lastCompany} onChange={handleChange} required />
                <TextField label="Joining Date" name="joiningDate" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.joiningDate} onChange={handleChange} required />
                <TextField label="Resignation Date" name="resignationDate" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.resignationDate} onChange={handleChange} />

                <Box sx={{ display: "flex", justifyContent: "end", gap: 1, mt: 2 }}>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Box>
            </Box>
        </>
    );
};

export default EmployeeForm;
