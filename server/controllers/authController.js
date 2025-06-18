import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

export const register = async(req,res)=>{
    const {name, email, password, username, mobileNumber, dateofBirth} = req.body;

    if(!name || !email || !password || !username || !mobileNumber || !dateofBirth){
        return res.json({success: false, message: "All fields are required"});
    }

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email: email },
                { username: username },
                { mobileNumber: mobileNumber }
            ]
            });
        if(existingUser){
            return res.json({success: false, message: "User already exists with this email, username or mobile number"});
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            username,
            mobileNumber,
            dateofBirth
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',      
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',  
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            path: '/' 
          });
          
          
          
          
        

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to ShareWallet',
            text: `Hello ${name},\n\nThank you for registering with ShareWallet! We're excited to have you on board.\nYour Username : ${username}\n\nBest regards,\nShareWallet Team`
        }
        await transporter.sendMail(mailOptions);

        return res.json({success:true});

    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}


export const login = async(req,res)=>{
    const {email , username , mobileNumber, password} = req.body;

    const identifier = email || username || mobileNumber;

    if(!identifier || !password){
        return res.json({success:false,message:"Email, username or mobile number and password are required"});
    }
    try {
        const user = await userModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier },
                { mobileNumber: identifier }
            ]
        });
        if(!user){
            return res.json({success:false,message:"User not found with this email, username or mobile number"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.json({success:false,message:"Invalid password"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // because you're on HTTPS (Render)
            sameSite: 'None', // required for cross-origin cookies
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
          });
          
        return res.json({success:true ,

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
        return res.json({success:false,message:error.message});
    }
}

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};
  
  


export const sendVerifyOtp = async(req,res)=>{
    try {
        

        console.log("Request Body:", req.body);

        const {email} = req.body;
        const user = await userModel.findOne({email});
         if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if(user.isVerified){
            return res.json({success:false,message:"User is already verified"});
        }
        const otp = String(Math.floor(100000 + Math.random()*90000));
        user.verifyotp = otp;
        user.verifyotpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verify your ShareWallet account',
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        };
        await transporter.sendMail(mailOptions);

        res.json({success:true,message:"OTP sent to your email"});

    } catch (error) {
        return res.json({success:false,message:error.message});
        
    }
}


export const verifyEmail = async(req,res)=>{
    const {otp , email} = req.body;

    if(!otp){
        return res.json({success:false,message:"User ID and OTP are required"});
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        if(user.verifyotp === ''|| user.verifyotp !== otp){
            return res.json({success:false,message:"Invalid OTP"});
        }
        if(user.verifyotpExpireAt< Date.now()){
            return res.json({success:false,message:"OTP has expired"});
        }
        user.isVerified = true;
        user.verifyotp = '';
        user.verifyotpExpireAt = 0;
        await user.save();
        return res.json({success:true,message:"Email verified successfully"});
        
    } catch (error) {
        return res.json({success:false,message:error.message});
        
    }

}




export const isAuthenticated = async (req, res) => {
  try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


//send password reset otp
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found with this email" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit OTP

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // expires in 10 mins

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset your ShareWallet password',
            html : PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "OTP sent to your email" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



//reset password
export const resetPassword = async (req,res) =>{
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success:false,message:"Email, OTP and new password are required"});
    }

    try {
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found with this email"});
        }

        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.json({success:false,message:"Invalid OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false,message:"OTP has expired"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = ''; 
        user.resetOtpExpireAt = 0;
        await user.save();

        return res.json({success:true,message:"Password reset successfully"});


    } catch (error) {
        return res.json({success:false,message:error.message});
        
    }
}