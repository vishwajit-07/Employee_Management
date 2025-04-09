import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  Button,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import Navbar from "./Navbar";
import { styled } from "@mui/system";
import backgroundImage from "../../assets/b.jpg";

// Glassmorphism Background
const Background = styled("div")({
  minHeight: "100vh",
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
  overflow: "auto",
  padding: "20px",
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
  maxWidth: "900px",
  width: "100%",
  height: "80vh", // Set a fixed height for scrolling
  padding: "20px",
  borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",
  border: "3px solid rgba(255, 255, 255, 0.4)",
  boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
  marginTop: "50px",
  textAlign: "left",
  overflowY: "auto", // Enable vertical scrolling
  overflowX: "hidden", // Hide horizontal scroll
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

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/employee/view/${id}`, { withCredentials: true });
      setEmployee(res.data.employee);
      
      // Include all history records
      const filteredHistory = res.data.employee.history || [];
      setHistory(filteredHistory);
    } catch (error) {
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const formatDate = (value) => {
    if (!value) return "N/A";
    if (typeof value === "string" && value.includes("T")) {
      return value.split("T")[0].split("-").reverse().join("/");
    }
    return value;
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <>
      <Navbar />
      <Background style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Overlay />
        <GlassContainer>
          {/* Employee Details in Two Columns */}
          <Typography variant="h5" gutterBottom textAlign="center">
            Employee Details
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              width: "100%",
              maxWidth: "800px",
              margin: "auto"
            }}
          >
            <Typography><strong>Name:</strong> {employee?.name}</Typography>
            <Typography><strong>Email:</strong> {employee?.email}</Typography>
            <Typography><strong>Experience:</strong> {employee?.experience || "Fresher"} years</Typography>
            <Typography><strong>Address:</strong> {employee?.address}</Typography>
            <Typography><strong>Last Company:</strong> {employee?.lastCompany || "N/A"}</Typography>
            <Typography><strong>Joining Date:</strong> {formatDate(employee?.joiningDate)}</Typography>
            <Typography><strong>Resignation Date:</strong> {employee?.resignationDate ? formatDate(employee.resignationDate) : "Still Working"}</Typography>
          </Box>


          {/* Employee Change History Table */}
          <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>Change History</Typography>
          <TableContainer component={Paper} sx={{ boxShadow: "none", background: "transparent", mt: 2 }}>
            {history.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Sr No.</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Change Title</strong></TableCell>
                    <TableCell><strong>Previous Information</strong></TableCell>
                    <TableCell><strong>Updated Information</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{record.date
                        ? record.date.split("T")[0].split("-").reverse().join("/")
                        : "N/A"}</TableCell>
                      <TableCell>{record.field.charAt(0).toUpperCase() + record.field.slice(1)}</TableCell>
                      <TableCell>{formatDate(record.oldValue)}</TableCell>
                      <TableCell>{formatDate(record.newValue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography variant="body2" sx={{ mt: 1, color: "gray", textAlign: "center" }}>No changes recorded.</Typography>
            )}
          </TableContainer>
          <StyledButton sx={{ mt: 2 }} onClick={() => navigate(-1)}>Go Back</StyledButton>
        </GlassContainer>
      </Background>
    </>
  );
};

export default ViewEmployee;
