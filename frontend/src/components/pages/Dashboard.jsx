import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import EmployeeTable from "../EmployeeTable";
import { styled } from "@mui/system";
import backgroundImage from "../../assets/b.jpg"; // Ensure correct image path
import { useSelector } from "react-redux";

// Styled Components for Full-Screen Glassmorphic UI
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
  background: "rgba(255, 255, 255, 0.2)", // Light translucent layer
  backdropFilter: "blur(10px)",
  zIndex: 1,
});

const GlassContainer = styled("div")({
  position: "relative",
  zIndex: 2,
  width: "100vw",
  maxWidth: "100%",
  height: "85vh",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderRadius: "0px",
  background: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",
  border: "3px solid rgba(255, 255, 255, 0.4)",
  boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
});

const TableContainer = styled("div")({
  flex: 1,
  width: "100%",
  overflowY: "auto",
  padding: "10px",
  borderRadius: "10px",
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

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const isFirstLogin = sessionStorage.getItem("firstLogin");

    if (!isFirstLogin) {
      setSnackbarMessage(`Successfully logged in ${user?.fullname}`);
      setSnackbarSeverity("success");
      setTimeout(() => setOpenSnackbar(true), 200);
      sessionStorage.setItem("firstLogin", "true"); // Set the flag
    }
  }, []);


  console.log(snackbarMessage);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleOpen = () => {
    navigate("/add-employee");
  };

  return (
    <Background style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Overlay />
      <Navbar />
      <GlassContainer>
        <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mb: 2, mt: 8 }}>
          Employee's Details
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "90%", mb: 2 }}>
          <StyledButton variant="contained" onClick={handleOpen}>
            Add Employee
          </StyledButton>
        </Box>
        <TableContainer sx={{ width: "90%" }}>
          <EmployeeTable setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
            setOpenSnackbar={setOpenSnackbar} />
        </TableContainer>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Moved to bottom-right
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </GlassContainer>
    </Background>
  );
};

export default Dashboard;
