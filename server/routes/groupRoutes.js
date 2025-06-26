import express from 'express';
import { createGroup } from '../controllers/groupController.js'
import { addFriendToGroup } from '../controllers/groupController.js';
import { getUserGroups } from '../controllers/groupController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.post('/create', userAuth, createGroup);
router.post('/add-member', userAuth, addFriendToGroup);
router.get('/user', userAuth, getUserGroups);

export default router;