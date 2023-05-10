import express from 'express';
import { createUser, loginUser, getAllUsersController } from "../controller/users.controller.js"
import { notFoundController } from '../controller/not-found.js';

var router = express.Router();

router.get('/', getAllUsersController)
router.post('/register', createUser)
router.post('/login', loginUser)
router.get('*', notFoundController)

export default router;