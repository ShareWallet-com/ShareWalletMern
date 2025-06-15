import express from 'express';
import {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest
} from '../controllers/friendController.js';

const router = express.Router();

router.get('/search', searchUsers);
router.post('/:id/send-request', sendFriendRequest);
router.post('/:id/accept-request', acceptFriendRequest);

export default router;
