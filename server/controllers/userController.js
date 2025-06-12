import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
  try {
    // Get email from session (or req.user if using auth middleware)
    const email = req.session?.user?.email;

    if (!email) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
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
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
