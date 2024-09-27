import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import connectDB from './utils/db.js'; 

// Load environment variables
dotenv.config();
connectDB();

// Passport configuration
import('./config/passport.js').then((module) => {
  module.default(passport);
});


// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/questions', questionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
