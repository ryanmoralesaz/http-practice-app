// Require the Express module to set up the HTTP server.
const express = require('express');

// Require the path module to work with file and directory paths.
const path = require('path');
// Require the fs module to work with the file system.
const fs = require('fs');
// require cors to deal with front end to back end calls
const cors = require('cors');
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
// Set the default port for the server to listen on.
// If the PORT environment variable is set, use that value, otherwise use 3000.
const PORT = process.env.PORT || 3000;

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
  fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read file' });
    }
    // Parse the data from the file to get an array of users
    const users = JSON.parse(data);
    // Add a new user to the array of users
    users.push(newUser);
    // Write the updated array of users back to the file
    fs.writeFile(
      path.join(__dirname, 'users.json'),
      JSON.stringify(users, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to write file' });
        }
        // Send a response back to the client
        res
          .status(201)
          .json({ message: 'User added successfully', newId: newUUID });
      }
    );
  });
});
// create the delete-user route to delete a user
app.delete('/api/delete-user/:id', (req, res) => {
  const userID = req.params.id;
  console.log('selected user is :', userID);
  fs.readFile('', '', () => {
    fs.writeFile('', '', () => {});
    res.json({ success: true, message: 'user was chosen', id: userID });
  });
});
// Start the server on the specified PORT.
// This makes the server listen for incoming requests on the defined PORT.
app.listen(PORT, () => {
  // Log a message to the console once the server starts successfully.
  console.log(`Server is running on http://localhost:${PORT}`);
});
