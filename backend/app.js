const mongoose = require('mongoose');
const { createServer } = require('http');
const server = require('./server');
const port = 3000;

// Connect to the MongoDB database
mongoose
  .connect('mongodb://127.0.0.1/newsDB', {
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
