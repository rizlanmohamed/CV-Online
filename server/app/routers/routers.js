import express from 'express';
import { createUser, loginUser, getAllUsersController, logoutUser, addUserDetails } from "../controller/users.controller.js"
import { notFoundMiddleware } from '../middleware/not-foundMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

var router = express.Router();

router.get('/alluser', protect, getAllUsersController)
router.post('/add_user', protect, addUserDetails)
router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('*', notFoundMiddleware)

export default router;