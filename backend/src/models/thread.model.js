import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
)

const Thread = mongoose.model('Thread', threadSchema)
export default Thread