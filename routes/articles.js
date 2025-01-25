const express = require('express');
const router = express.Router();

// Example article routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all articles' });
});

router.post('/', (req, res) => {
  const article = req.body; // Access the article data from the request body
  res.json({ message: 'Create a new article', article });
});

router.get('/:id', (req, res) => {
  const articleId = req.params.id;
  res.json({ message: `Get article with ID: ${articleId}` });
});

router.put('/:id', (req, res) => {
  const articleId = req.params.id;
  const updatedData = req.body;
  res.json({ message: `Update article with ID: ${articleId}`, updatedData });
});

router.delete('/:id', (req, res) => {
  const articleId = req.params.id;
  res.json({ message: `Delete article with ID: ${articleId}` });
});

module.exports = router;
