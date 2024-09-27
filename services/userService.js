import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (email, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  // Save the user to the database
  await newUser.save();

  // Generate a token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiry time
  });

  return { token, userId: newUser._id };
};
export const getUserById = async (userId) => {
  return User.findById(userId);
};

export const editProfile = async (userId, newData) => {
  return User.findByIdAndUpdate(userId, newData, { new: true });
};
export const getUserAggregations = async () => {
  try {
    const users = await User.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'orders',          
          localField: '_id',       
          foreignField: 'userId',  
          as: 'userOrders',        
        },
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          profilePicture: 1,
          numberOfOrders: { $size: '$userOrders' },
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return users;
  } catch (error) {
    console.error('Error in aggregation:', error);
    throw new Error('Error fetching user aggregations');
  }
};