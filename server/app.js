// Require the Express module to set up the HTTP server.
const express = require('express');

// Require the path module to work with file and directory paths.
const path = require('path');
// Require the fs module to work with the file system.
const fs = require('fs');
// require cors to deal with front end to back end calls
const cors = require('cors');
// require helmet for CSP
const helmet = require('helmet');
// require UUID for unique keys
const { v4: uuidv4 } = require('uuid');
// Create an instance of an Express application.
const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors());
// Alternatively, you can configure CORS with more specific options
// app.use(cors({
//   origin: 'http://127.0.0.1:5500'  // Allow only this origin to access
// }));
// configure helmet
// Configuring Helmet with CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Default setting for all sources. 'self' refers to the same origin.
        connectSrc: ["'self'", 'http://127.0.0.1:3000'] // Allow connections to the server itself and the local API
        // Add other resource-specific directives as needed
      }
    }
  })
);
// Set the default port for the server to listen on.
// If the PORT environment variable is set, use that value, otherwise use 3000.
const PORT = process.env.PORT || 3000;
const usersPath = path.join(__dirname, 'users.json');
// Use the express.static middleware to serve static files.
// This line tells Express to serve static files from the 'public' directory.
// `path.join` is used to construct a path to the public directory relative to this script.
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
  console.log(`Current directory: ${process.cwd()}`);
});
// Define a route handler for GET requests to the root URL ('/').
// When a user visits the root URL, this function will run.
app.get('/api/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
    if (err) {
      // send some kind of status or check for status
      console.error(err);
      return res.status(500).json({ error: 'Failed to read file' });
    }
    // JSON.pares takes the utf-8 data and turns it into a JS object
    const users = JSON.parse(data);
    // res.json sends the data back to the client by stringifying the data, it handles content-type settings and data serialization
    res.json(users);
    console.log('found users');
  });
});
// Define a route handler for POST requests to the '/api/add-user' URL.
// When a user makes a POST request to this URL, this function will run.
app.post('/api/add-user', (req, res) => {
  console.log(req.body);
  const newUUID = uuidv4();
  // add a uuid to the new user
  const newUser = { id: newUUID, ...req.body };
  // Read the existing users from the users.json file
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read file' });
    }
    // Parse the data from the file to get an array of users
    const users = JSON.parse(data);
    // Add a new user to the array of users
    users.push(newUser);
    // Write the updatedh array of users back to the file
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to write file' });
      }
      // Send a response back to the client
      res
        .status(201)
        .json({ message: 'User added successfully', newId: newUUID });
    });
  });
});
// create the delete-user route to delete a user
app.delete('/api/delete-user/:id', (req, res) => {
  const userID = req.params.id;
  console.log('selected user is :', userID);
  // specify the correct file path for `fs.readFile`
  // fill in the correct parameters to read `users.json`
  // handle a read error
  // udpate the users array by filtering out deleted user
  // write the update array back tho the file
  // make sure to handle appropriate user errors
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read file' });
    }
    const users = JSON.parse(data);
    const filteredUsers = users.filter((user) => {
      return user.id !== userID;
    });
    fs.writeFile(usersPath, JSON.stringify(filteredUsers, null, 2), (err) => {
      if (err) {
        console.err('there was an error writing to file', err);
        return res.status(500).json({
          error: 'failed to write to file'
        });
      }
    });
    res.json({ success: true, message: 'user was chosen', id: userID });
  });
});

const statusCodes = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../config/statusCodes.json'), 'utf8')
);
// practice routes
//// establish some basic routes to practice http verbs
app.get('/api/items', (req, res) => {
  const query = req.query;
  console.log('query was', query);
  res
    .status(statusCodes.OK.statusCode)
    .json({ message: 'Get request received for items' });
});
app.post('/api/items', (req, res) => {
  const body = req.body;
  console.log(body);
  // simulate a bad request for an empty body
  if (Object.keys(body).length === 0) {
    throw new Error('Bad_Request');
  }
  res.status(statusCodes.CREATED.statusCode).send('Post received with data');
});
app.put('/api/items/:id', (req, res) => {
  const itemID = req.params.id;
  const body = req.body;
  console.log(`updating item ${itemID} with data`, body);
  res
    .status(statusCodes.OK.statusCode)
    .send(`PUT request received for item ${itemID}`);
});
app.delete('/api/items/:id', (req, res) => {
  const itemID = req.params.id;
  console.log(`deleting item ${itemID}`);
  res
    .status(statusCodes.OK.statusCode)
    .send(`DELETE request received for item ${itemID}`);
});
// central error handling route
app.use((err, req, res, next) => {
  const error =
    statusCodes[err.message] || statusCodes['INTERNAL_SERVER_ERROR'];
  res.status(error.statusCode).send({ error: error.message });
});
// Start the server on the specified PORT.
// This makes the server listen for incoming requests on the defined PORT.
app.listen(PORT, () => {
  // Log a message to the console once the server starts successfully.
  console.log(`Server is running on http://localhost:${PORT}`);
});
