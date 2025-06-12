import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({ success: false, message: "Unauthorized access, please login first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
                username: user.username,
                dateOfBirth: user.dateOfBirth,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error("Error in getUserData:", error.message);
        return res.json({ success: false, message: "Error fetching user data" });
    }
};
