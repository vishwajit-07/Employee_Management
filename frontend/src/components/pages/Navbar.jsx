import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice.js"; // Import the logout action
import { useDispatch, useSelector } from "react-redux"; // Import useSelector

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access the logged-in user's data from Redux store
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      // Send request to backend to logout and clear the cookie
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });

      // Dispatch logout action to Redux to clear the user state
      dispatch(logout());

      // Optionally clear any local storage or session data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Navigate to the login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      // Handle error if needed (e.g., display a toast)
    }
  };

  return (
    <AppBar position="fixed" elevation={2} sx={{ backgroundColor: "primary.main", width: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Dashboard Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}>
          Employee Management Dashboard
        </Typography>

        {/* Display User's Name */}
        {user && (
          <Typography sx={{ display: { xs: "none", sm: "block" }, color: "white", mr: 2 }}>
            Welcome, {user.fullname} !
          </Typography>
        )}

        {/* Logout Button */}
        <Button color="inherit" onClick={handleLogout} sx={{ display: { xs: "none", sm: "block" } }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
