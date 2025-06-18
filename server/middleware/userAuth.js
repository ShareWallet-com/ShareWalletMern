import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'

const userAuth = async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.json({success:false,message:"Unauthorized access, please login first"});
    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.user = { id: tokenDecode.id };
            return next();
        }else{
            return res.json({success:false,message:"Not Authorized, please login first"});
        }
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "No token found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default userAuth;