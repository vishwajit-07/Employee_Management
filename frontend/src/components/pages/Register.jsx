import React, { useState } from "react";
import { TextField, Button, Typography, Container, Link, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/system";
import backgroundImage from "../../assets/b.jpg"; // Ensure correct image path

const Background = styled("div")({
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundImage: "url('/assets/bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "fixed",
  top: 0,
  left: 0,
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(255, 255, 255, 0.2)",
  zIndex: 1,
});

const GlassBox = styled("div")({
  position: "relative",
  zIndex: 2,
  padding: "30px",
  borderRadius: "15px",
  background: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",
  maxWidth: "400px",
  width: "90%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  border: "4px solid white",
  boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.6)",
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

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ fullname: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Frontend validation for password and confirmPassword
    if (input.password !== input.confirmPassword) {
      setSnackbarMessage('Password and Confirm Password do not match!');
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/register", input, {
        headers: { "Content-Type": "application/json" },
      });


      if (res.data) {
        setSnackbarMessage(res.data.message || "Registration successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      console.log("Error Response:", error.response); // Debugging purpose
      setSnackbarMessage(error.response?.data?.message || "Registration failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };


  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Background style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Overlay />
      <GlassBox>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            label="Full Name"
            name="fullname"
            type="text"
            variant="outlined"
            fullWidth
            value={input.fullname}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "5px" }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={input.email}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "5px" }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={input.password}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "5px" }}
          />
          <TextField
            label="confirmPassword"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={input.confirmPassword}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "5px" }}
          />

          <StyledButton type="submit" fullWidth>
            Register
          </StyledButton>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link component="button" variant="body2" onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>
            Login
          </Link>
        </Typography>
      </GlassBox>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Position at bottom-right
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Background>
  );
};

export default Register;
