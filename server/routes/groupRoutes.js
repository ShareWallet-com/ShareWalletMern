import express from 'express';
import { createGroup } from '../controllers/groupController.js'
import { addFriendToGroup } from '../controllers/groupController.js';

const router = express.Router();

router.post('/create', createGroup);
router.post('/add-member', addFriendToGroup);

export default router;