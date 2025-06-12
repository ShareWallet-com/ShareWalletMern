import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    console.log("Cookies received:", req.cookies);
    
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access, please login first"
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!tokenDecode?.id) {
            return res.status(403).json({
                success: false,
                message: "Invalid token structure"
            });
        }

        req.userId = tokenDecode.id;
        next();

    } catch (error) {
        console.error("JWT Verification Error:", error);
        
        let message = "Authentication failed";
        if (error.name === 'TokenExpiredError') {
            message = "Session expired, please login again";
        } else if (error.name === 'JsonWebTokenError') {
            message = "Invalid token";
        }

        return res.status(401).json({
            success: false,
            message: message
        });
    }
}

export default userAuth;