require('dotenv').config();
const mongoose = require('mongoose');
const { createServer } = require('http');
const server = require('./src/server/server');
const port = process.env.PORT
const dbUrl = process.env.MONGODBCONNECT

// Connect to the MongoDB database
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successful');
  })
  .catch((error) => {
    console.error('DB Connection Error:', error);
  });

// Create an HTTP server and integrate it with Express
const httpServer = createServer(server);

// Start the Express server
httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
