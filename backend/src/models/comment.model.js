import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { type: String, requred: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)
export default Comment;