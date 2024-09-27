import express from 'express';
import multer from 'multer';
import passport from 'passport';
import { getQuestionsByCategory, addBulkQuestions } from '../controllers/questionController.js';
import { validateGetQuestionsByCategory } from '../utils/validators.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/category/:categoryId',
passport.authenticate('jwt', { session: false }), 
validateGetQuestionsByCategory,
getQuestionsByCategory);

router.post('/bulk',
passport.authenticate('jwt',
{ session: false }), upload.single('file'),
addBulkQuestions);

export default router;
