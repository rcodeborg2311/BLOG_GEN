import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  theme: {
    name: String,
    primaryColor: String,
    fontStyle: String,
    layout: String,
  },
  customizations: {
    headerStyle: String,
    footerStyle: String,
    blogLayout: String,
    colorScheme: String,
  },
  content: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema); 