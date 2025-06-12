import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "Unauthorized access, please login first" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid token" });
    }
};
