import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import { toast } from "sonner"; // Toast notifications

const EmployeeForm = ({ employee }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        experience: "",
        lastCompany: "",
        joiningDate: "",
        resignationDate: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (employee) setFormData(employee);
    }, [employee]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData); // Debug the formData here
    };

    const handleClose = () => {
        navigate("/dashboard");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form is being submitted!"); // Debugging here to check if submit is triggered

        try {
            const res = await axios.post(
                "http://localhost:5000/employee/add",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(res.data); // Check response from backend
            toast.success("Employee added successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error adding employee:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to add employee.");
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
                    mt: 8,
                    padding: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5
                }}
            >
                <Box sx={{ textAlign: "center" }}>
                    <h2>Employee Form</h2>
                </Box>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Address"
                    name="address"
                    fullWidth
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Experience (in years)"
                    name="experience"
                    type="number"
                    fullWidth
                    value={formData.experience}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Last Company"
                    name="lastCompany"
                    fullWidth
                    value={formData.lastCompany}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Joining Date"
                    name="joiningDate"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.joiningDate}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Resignation Date (Optional)"
                    name="resignationDate"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.resignationDate}
                    onChange={handleChange}
                />

                <Box sx={{ display: "flex", justifyContent: "end", gap: 1, mt: 2 }}>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Box>
            </Box>
        </>
    );
};


export default EmployeeForm;
