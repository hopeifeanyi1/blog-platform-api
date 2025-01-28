const express = require('express');
const router = express.Router();
const Article = require('../models/Article'); // Import the Article model

// Get all articles
router.get('/', async (req, res, next) => {
    try {
      const articles = await Article.find(); // Fetch all articles from MongoDB
      res.json(articles);
    } catch (error) {
      next(error); // Pass errors to the error-handling middleware
    }
  });

// Create a new article
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }

  try {
    const newArticle = new Article({ title, content, author });
    const savedArticle = await newArticle.save(); // Save to MongoDB
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the article' });
  }
});

// Update an article by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArticle) return res.status(404).json({ error: 'Article not found' });
    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the article' });
  }
});

// Delete an article by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the article' });
  }
});

module.exports = router;
