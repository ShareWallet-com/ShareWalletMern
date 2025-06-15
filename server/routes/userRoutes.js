import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.get('/data',userAuth,getUserData);
userRouter.get('/:id', userAuth, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


export default userRouter;