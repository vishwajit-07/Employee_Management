import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));
app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB(); // Ensure the DB connection is successful
    console.log(`Server running successfully on ${PORT}`);
});
