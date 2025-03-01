import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/employee/${id}`);
      setEmployee(res.data.employee);
    } catch (error) {
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Employee Details
        </Typography>
        <Typography><strong>Name:</strong> {employee?.name}</Typography>
        <Typography><strong>Email:</strong> {employee?.email}</Typography>
        <Typography><strong>Experience:</strong> {employee?.experience} years</Typography>
        <Typography><strong>Address:</strong> {employee?.address}</Typography>
        <Typography><strong>Last Company:</strong> {employee?.lastCompany}</Typography>
        <Typography><strong>Joining Date:</strong> {new Date(employee?.joiningDate).toLocaleDateString()}</Typography>
        <Typography><strong>Resignation Date:</strong> {new Date(employee?.resignationDate).toLocaleDateString()}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>Go Back</Button>
      </CardContent>
    </Card>
  );
};

export default ViewEmployee;
