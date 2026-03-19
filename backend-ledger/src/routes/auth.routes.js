import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { validateRegister, validateLogin,} from '../validators/auth.validator.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('logout', logout)
router.post('/get-me',authMiddleware, getMe);

export default router;
