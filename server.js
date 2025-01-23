require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const path = require('path');

// MongoDB plugin
fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.MONGO_URI,
});

// Import Routes
const articleRoutes = require('./routes/articles');

// Register Routes
fastify.register(articleRoutes);

// Start the Server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server running on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
