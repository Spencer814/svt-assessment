import http from 'http';

import { findClosest, handleBadRequest } from './controller';

import 'dotenv/config';

const { PORT } = process.env;

// create the server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/robots/closest/') {
    // Retrieve the closest robot to the load
    return findClosest(req, res);
  } else {
    // Return an error for all other requests
    return handleBadRequest(req, res);
  }
});

// set up the server port and listen for connections
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}. Visit http://localhost:${PORT}`);
});
