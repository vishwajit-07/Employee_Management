import { useEffect, useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user)); // ✅ Update Redux store
        toast.success("Login Successful!");
      } else {
        toast.error(res.data.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Invalid Credentials");
    }
  };

  // ✅ Navigate to dashboard once user state updates
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      <h2>Login</h2>
      <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ marginTop: "16px" }}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
