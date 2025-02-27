import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { chechAuth, login, logout, signUp, updateProfile } from '../controller/auth.controller.js';
const router = express.Router();
router.post('/signUp', signUp);

router.post('/Login', login);
router.post('/logout', logout);

router.put("/update-profile", protectRoute, updateProfile)
router.get("/check", protectRoute, chechAuth)
export default router;