import express from 'express';
import passport from 'passport';
import { getAllCategories } from '../controllers/categoryController.js';
import { validateGetAllCategories } from '../utils/validators.js';

const router = express.Router();

router.get('/getAllCategories',
passport.authenticate('jwt', { session: false }),
validateGetAllCategories,
getAllCategories);

export default router;
