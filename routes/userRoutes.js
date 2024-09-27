import express from 'express';
import passport from 'passport';
import { login, viewProfile, editProfile } from '../controllers/userController.js';
import { validateLogin, validateProfileUpdate } from '../utils/validators.js';

const router = express.Router();

const authMiddleware = passport.authenticate('jwt', { session: false });

router.post('/login',
validateLogin, 
login);

router.get('/profile',
authMiddleware,
viewProfile);

router.put('/profile',
authMiddleware,
validateProfileUpdate,
editProfile);

export default router;
