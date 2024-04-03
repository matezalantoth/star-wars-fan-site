import mongoose from 'mongoose';

const User = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export default mongoose.model('User', User);
