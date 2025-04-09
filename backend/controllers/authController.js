import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "../models/User.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;

        console.log("Received Data:", { fullname, email, password, confirmPassword }); // ✅ Debugging

        // Check if all fields are provided
        if (!fullname || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required!",
                success: false
            });
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password and Confirm Password do not match!",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { fullname, email },
        });

    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set token in cookie and send user info in response
    return res.status(200).cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      sameSite: 'strict',
    }).json({
      message: `Welcome back, ${user.fullname}!`,
      success: true,
      user,  // Send user info
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

 
export const logout = (req, res) => {
  try {
    res.clearCookie("token"); // Remove authentication token (if stored in cookies)
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
};