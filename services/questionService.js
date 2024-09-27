import Question from '../models/question.js';
import fs from 'fs';
import csv from 'csv-parser';

export const getQuestionsByCategory = async (categoryId) => {
  return Question.find({ categories: categoryId });
};

export const addBulkQuestions = async (filePath) => {
  const questions = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        questions.push(row);
      })
      .on('end', async () => {
        await Question.insertMany(questions);
        resolve();
      })
      .on('error', reject);
  });
};
