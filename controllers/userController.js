import * as userService from '../services/userService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; 
    const { token, userId } = await userService.login(email, password);
    res.status(200).json({ token, userId }); 
  } catch (error) {
    if (error.message === 'User already exists') {
      res.status(409).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message || 'Registration failed' }); 
    }
  }
};


export const viewProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body;
    await userService.editProfile(userId, updatedData);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
