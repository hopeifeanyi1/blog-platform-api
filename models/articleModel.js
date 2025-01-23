function getArticleCollection(fastify) {
    return fastify.mongo.db.collection('articles');
  }
  
  module.exports = { getArticleCollection };
  