import userModel from '../models/userModel.js';

export const getUserData = async(req,res) =>{
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);
        if(!user){
            return { success: false, message: "User not found" };
        }

        res.json({
            success: true,
            user: {
                _id: user._id,
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
        return { success: false, message: "User not found" };

        
    }
}