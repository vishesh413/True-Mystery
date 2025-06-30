import mongoose, { Schema, Document } from 'mongoose';

// ✅ Message Type — not extending Document (since it's a subdocument, not full model)
export interface Message {
    _id: string;  
  content: string;
  createdAt: Date;
}

// ✅ User Interface — extending Document
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

// ✅ Message Schema — for subdocument (not full model)
const MessageSchema = new Schema<Message>(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { _id: false } // optional: don’t generate _id for each message
);

// ✅ User Schema
const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify code expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: {
    type: [MessageSchema],
    default: [],
  },
});

// ✅ Safe model export — Next.js compatible (avoid re-definition on hot reload)
const UserModel =
  mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
