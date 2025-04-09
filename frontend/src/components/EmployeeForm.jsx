import React, { useState, useEffect } from "react";
import { TextField, Box, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import { styled } from "@mui/system";
import backgroundImage from "../assets/b.jpg";

// Styled Components
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

const GlassContainer = styled("div")({
  position: "relative",
  zIndex: 2,
  width: "80vw",
  maxWidth: "100%",
  height: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",
  border: "3px solid rgba(255, 255, 255, 0.4)",
  boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
  marginTop: "70px",
});

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (employee) setFormData(employee);
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/employee/add", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);

        setTimeout(() => {
          setSnackbarOpen(false);
          navigate("/dashboard");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || "Failed to add employee.");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      <Background style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Overlay />
        <GlassContainer>
          <h2>Employee Form</h2>
          <Box
            component="form"
            sx={{
              width: "90%",
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              justifyContent: "space-between",
            }}
          >
            <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} required sx={{ width: "calc(50% - 10px)" }} />
            <TextField label="Email" name="email" type="email" fullWidth value={formData.email} onChange={handleChange} required sx={{ width: "calc(50% - 10px)" }} />
            <TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} required sx={{ width: "calc(50% - 10px)" }} />
            <TextField label="Experience (in years)" name="experience" type="number" fullWidth value={formData.experience} onChange={handleChange} required sx={{ width: "calc(50% - 10px)" }} />
            <TextField label="Last Company" name="lastCompany" fullWidth value={formData.lastCompany} onChange={handleChange} required sx={{ width: "calc(50% - 10px)" }} />
            <TextField label="Joining Date" name="joiningDate" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.joiningDate} onChange={handleChange} required sx={{ width: "calc(50% - 10px)" }} />
            <TextField label="Resignation Date (Optional)" name="resignationDate" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.resignationDate} onChange={handleChange} sx={{ width: "calc(50% - 10px)" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <StyledButton onClick={handleClose}>Cancel</StyledButton>
            <StyledButton type="submit" onClick={handleSubmit} variant="contained">Submit</StyledButton>
          </Box>
        </GlassContainer>
      </Background>

      {/* Snackbar Notification */}
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
    </>
  );
};

export default EmployeeForm;
