import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    experience: "",
    lastCompany: "",
    joiningDate: "",
    resignationDate: "",
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/employee/${id}`);
      setEmployee(res.data.employee);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/employee/${id}`, employee);
      navigate("/employees"); // Redirect to employee list after update
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Update Employee
        </Typography>
        <TextField fullWidth label="Name" name="name" value={employee.name} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Email" name="email" value={employee.email} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Address" name="address" value={employee.address} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Experience" name="experience" value={employee.experience} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Last Company" name="lastCompany" value={employee.lastCompany} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Joining Date" name="joiningDate" type="date" value={employee.joiningDate} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Resignation Date" name="resignationDate" type="date" value={employee.resignationDate} onChange={handleChange} margin="normal" />
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>Update</Button>
        <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={() => navigate(-1)}>Cancel</Button>
      </CardContent>
    </Card>
  );
};

export default UpdateEmployee;
