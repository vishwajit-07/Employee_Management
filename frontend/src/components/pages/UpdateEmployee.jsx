import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Typography, CardContent,Alert, Snackbar, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "./Navbar";
import backgroundImage from "../../assets/b.jpg";

// Background Styling
const Background = styled("div")({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "fixed",
  top: 0,
  left: 0,
  overflow: "hidden",
});

// Overlay Styling
const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  zIndex: 1,
});

// Glassmorphic Container
const GlassContainer = styled("div")({
  position: "relative",
  zIndex: 2,
  maxWidth: "900px",
  width: "90%",
  padding: "20px",
  borderRadius: "15px",
  background: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",
  border: "3px solid rgba(255, 255, 255, 0.4)",
  boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
  marginTop: "70px"
});

// Styled Button
const StyledButton = styled(Button)({
  padding: "10px 20px",
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "none",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: "#222",
  border: "2px solid white",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.7)",
  },
});

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
      const res = await axios.get(`http://localhost:5000/employee/view/${id}`, { withCredentials: true });
      const data = res.data.employee;

      setEmployee({
        ...data,
        joiningDate: data.joiningDate ? data.joiningDate.split("T")[0] : "",
        resignationDate: data.resignationDate ? data.resignationDate.split("T")[0] : "",
      });
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/employee/update/${id}`, employee, { withCredentials: true });

      // Set snackbar message from API response
      setSnackbarMessage(res.data.message || "Employee updated successfully");
      setSnackbarOpen(true);

      // Close snackbar and navigate after a delay
      setTimeout(() => {
        setSnackbarOpen(false);
        navigate("/dashboard");
      }, 2000); // Redirect after 2 seconds

    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };


  return (
    <>
      <Navbar />
      <Background style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Overlay />
        <GlassContainer>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Update Employee
            </Typography>

            {/* Flexbox Layout for Horizontal Fields */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-between" }}>
              <TextField fullWidth label="Name" name="name" value={employee.name} onChange={handleChange} sx={{ flex: "1 1 48%" }} />
              <TextField fullWidth label="Email" name="email" value={employee.email} onChange={handleChange} sx={{ flex: "1 1 48%" }} />
              <TextField fullWidth label="Address" name="address" value={employee.address} onChange={handleChange} sx={{ flex: "1 1 48%" }} />
              <TextField fullWidth label="Experience" name="experience" value={employee.experience} onChange={handleChange} sx={{ flex: "1 1 48%" }} />
              <TextField fullWidth label="Last Company" name="lastCompany" value={employee.lastCompany} onChange={handleChange} sx={{ flex: "1 1 48%" }} />
              <TextField fullWidth label="Joining Date" name="joiningDate" type="date" value={employee.joiningDate} onChange={handleChange} sx={{ flex: "1 1 48%" }} />
              <TextField fullWidth label="Resignation Date" name="resignationDate" type="date" value={employee.resignationDate} onChange={handleChange} sx={{ flex: "1 1 48%" }} />
            </Box>

            {/* Button Row */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
              <StyledButton onClick={handleUpdate}>Update</StyledButton>
              <StyledButton onClick={() => navigate(-1)}>Cancel</StyledButton>
            </Box>

          </CardContent>
        </GlassContainer>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Position at bottom-right
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Background>
    </>
  );
};
export default UpdateEmployee;

