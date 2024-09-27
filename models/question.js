import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: String,
  content: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

export default mongoose.model('Question', questionSchema);
