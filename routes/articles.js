const { getArticleCollection } = require('../models/articleModel');

async function articleRoutes(fastify) {
  const articles = getArticleCollection(fastify);

  // Get All Articles
  fastify.get('/articles', async (request, reply) => {
    const { tag, date } = request.query;
    const query = {};
    if (tag) query.tags = tag;
    if (date) query.publishedAt = { $gte: new Date(date) };

    const result = await articles.find(query).toArray();
    return result;
  });

  // Get Single Article
  fastify.get('/articles/:id', async (request, reply) => {
    const { id } = request.params;
    const article = await articles.findOne({ _id: fastify.mongo.ObjectId(id) });
    if (!article) return reply.status(404).send({ message: 'Article not found' });
    return article;
  });

  // Create New Article
  fastify.post('/articles', async (request, reply) => {
    const { title, content, tags } = request.body;
    const result = await articles.insertOne({
      title,
      content,
      tags,
      publishedAt: new Date(),
    });
    return { _id: result.insertedId };
  });

  // Update an Article
  fastify.put('/articles/:id', async (request, reply) => {
    const { id } = request.params;
    const { title, content, tags } = request.body;

    const result = await articles.updateOne(
      { _id: fastify.mongo.ObjectId(id) },
      { $set: { title, content, tags, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0)
      return reply.status(404).send({ message: 'Article not found' });

    return { message: 'Article updated successfully' };
  });

  // Delete an Article
  fastify.delete('/articles/:id', async (request, reply) => {
    const { id } = request.params;
    const result = await articles.deleteOne({ _id: fastify.mongo.ObjectId(id) });
    if (result.deletedCount === 0)
      return reply.status(404).send({ message: 'Article not found' });

    return { message: 'Article deleted successfully' };
  });
}

module.exports = articleRoutes;
