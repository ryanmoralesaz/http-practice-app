var express = require('express');
var app = express();
var router = express.Router();

app.use(express.json()); // Middleware to parse JSON bodies

// Example in-memory data store
let users = {};

// POST: Create a new user
router.post('/', function (req, res) {
  const { username, data } = req.body;
  if (users[username]) {
    return res.status(400).json({ error: 'User already exists' });
  }
  users[username] = data;
  res.status(201).json({ message: 'User created', user: { username, data } });
});

// PUT: Update an existing user
router.put('/:username', function (req, res) {
  const { username } = req.params;
  const { data } = req.body;
  if (!users[username]) {
    return res.status(404).json({ error: 'User not found' });
  }
  users[username] = data;
  res.json({ message: 'User updated', user: { username, data } });
});

// DELETE: Delete an existing user
router.delete('/:username', function (req, res) {
  const { username } = req.params;
  if (!users[username]) {
    return res.status(404).json({ error: 'User not found' });
  }
  delete users[username];
  res.json({ message: 'User deleted' });
});

// PATCH: Partially update an existing user
router.patch('/:username', function (req, res) {
  const { username } = req.params;
  const { data } = req.body;
  if (!users[username]) {
    return res.status(404).json({ error: 'User not found' });
  }
  users[username] = { ...users[username], ...data };
  res.json({ message: 'User partially updated', user: { username, data: users[username] } });
});

// Mount the router on /users path
app.use('/users', router);

// Start the server
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
