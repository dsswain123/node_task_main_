import * as questionService from '../services/questionService.js';

export const getQuestionsByCategory = async (req, res) => {
  try {
    const questions = await questionService.getQuestionsByCategory(req.params.categoryId);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addBulkQuestions = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'CSV file is required' });
    }
    await questionService.addBulkQuestions(file.path);
    res.json({ message: 'Bulk questions added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
