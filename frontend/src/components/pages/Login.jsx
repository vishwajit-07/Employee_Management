import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Link,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice.js";
import { styled } from "@mui/system";
import backgroundImage from "../../assets/b.jpg"; // Ensure correct image path


// Styled Components for Glassmorphism
const Background = styled("div")({
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundImage: "url('/assets/background.jpg')", // Change this to your background image
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

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/auth/login", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("Login response:", res.data);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/dashboard", { state: { message: res.data.message || "Welcome!" } });
      } else {
        setSnackbarMessage(res.data.message || "Login failed. Try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setSnackbarMessage(error.response?.data?.message || "Invalid Credentials");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  useEffect(() => {
    console.log("Snackbar State Updated:", { openSnackbar, snackbarMessage, snackbarSeverity });
  }, [openSnackbar]);

  return (
    <Background style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Overlay />
      <GlassBox>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Fade in={true} timeout={1000}>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
              value={input.email}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "5px" }}
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
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "5px" }}
            />
            <StyledButton fullWidth type="submit" disabled={loading} sx={{ mt: 2 }}>
              {loading ? (
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              ) : (
                "Login"
              )}
            </StyledButton>
          </form>
        </Fade>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/register" variant="body2" sx={{ textDecoration: "none", fontWeight: "bold" }}>
            Register here
          </Link>
        </Typography>
      </GlassBox>
      <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Moved to bottom-right
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </Background>
  );
};

export default Login;
