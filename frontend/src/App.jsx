import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/pages/login.jsx";
import Register from "./components/pages/Register.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import { Container } from "@mui/material";
import EmployeeForm from "./components/EmployeeForm.jsx";
import ViewEmployee from "./components/pages/ViewEmployee.jsx";
import UpdateEmployee from "./components/pages/UpdateEmployee.jsx";
import PrivateRoute from "./components/pages/PrivateRoutes.jsx";


function App() {
  const user = useSelector(store => store.auth.user);  // Correct path to access the user

  console.log(user);
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

          {/* Use PrivateRoute for protected routes */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/add-employee" element={<PrivateRoute element={<EmployeeForm />} />} />
          <Route path="/employee/:id" element={<PrivateRoute element={<ViewEmployee />} />} />
          <Route path="/employee/update/:id" element={<PrivateRoute element={<UpdateEmployee />} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;



