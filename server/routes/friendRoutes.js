import express from 'express';
import {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest
} from '../controllers/friendController.js';
import userAuth from '../middleware/userAuth.js';
import { removeFriend } from '../controllers/friendController.js';
import isAuth from '../middleware/userAuth.js'


const router = express.Router();

router.get('/search',userAuth, searchUsers);
router.post('/:id/send-request', userAuth, sendFriendRequest);
router.post('/:id/accept-request', userAuth, acceptFriendRequest);
router.delete('/:id/remove', isAuth, removeFriend);
export default router;
