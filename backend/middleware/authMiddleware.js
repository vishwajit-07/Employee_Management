import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated!',
                success: false
            });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            });
        }

        req.id = decoded.userId; // Ensure userId is stored in the token
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(401).json({
            message: 'Invalid or expired token',
            success: false
        });
    }
};

export default isAuthenticated;
