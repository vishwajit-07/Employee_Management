import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = ({ onLogout }) => {
  return (
    <AppBar 
      position="fixed" 
      elevation={2} 
      sx={{ 
        backgroundColor: "primary.main", 
        width: "100%" 
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Dashboard Title */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}
        >
          Employee Management Dashboard
        </Typography>

        {/* Logout Button */}
        <Button 
          color="inherit" 
          onClick={onLogout} 
          sx={{ display: { xs: "none", sm: "block" } }} // Hide on small screens
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
