import { useState } from "react";
import { TextField, Button, Container, Paper, Typography, Box, CircularProgress, Link, Fade, Snackbar } from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/authSlice.js';  // Ensure the path is correct

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/auth/login", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,  // Make sure cookies are sent with the request
      });

      console.log("Login response:", res.data);

      if (res.data.success) {
        // Dispatch the user data to Redux
        dispatch(setUser(res.data.user));
        console.log(res.data.user);

        // Show success toast
        toast.success("Login Successful!");

        // Redirect to dashboard after successful login
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(res.data.message || "Login failed. Try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Invalid Credentials");
      setLoading(false);
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <Fade in={true} timeout={1000}>
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
              value={input.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
              value={input.password}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Logging in...
                </Box>
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </Fade>

        {/* Link to the Register page */}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link href="/register" variant="body2" sx={{ textDecoration: 'none', fontWeight: 'bold' }}>
            Register here
          </Link>
        </Typography>

        {/* Snackbar for login errors or success */}
        <Snackbar
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          autoHideDuration={6000}
          severity={snackbarSeverity}
        />
      </Paper>
    </Container>
  );
};

export default Login;
