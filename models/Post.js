const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  content: {
    type: Array,
    default: [],
    required: true
  },

  imageLink: {
    type: String,
    default: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  author: {
    type: String,
    required: true
  },

  likes: {
    type: Number,
    default: 0
  },

  pageViews: {
    type: Number,
    default: 0
  }

});

// Indexing the content, title, description and category field
PostSchema.index({
  'content.content': 'text',
  title: 'text',
  description: 'text',
  category: 'text'
});

// Exporting the schema
module.exports = mongoose.model('Posts', PostSchema);