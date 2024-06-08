import {
  updateSessionStorageWithUsers,
  retrieveSessionStorageUsers,
  renderUsers
} from './renderUsers.js';
document
  .getElementById('addUserForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const users = retrieveSessionStorageUsers();
    const name = this.name.value;
    const age = parseInt(this.age.value);
    const formData = { name: name, age: age };
    users.push(formData);
    updateSessionStorageWithUsers(users);
    renderUsers(users);
    fetch('http://localhost:3000/api/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('success', data);
        let newUser = { id: data.newId, ...users[users.length - 1] };
        users[users.length - 1] = newUser;
        renderUsers(users);
        updateSessionStorageWithUsers(users);
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        rollBackUserAdd(formData);
      });
  });

function rollBackUserAdd(formData) {
  const users = retrieveSessionStorageUsers();
  users = users.filter((user) => user.name != formData.name);
  updateSessionStorageWithUsers(users);
  renderUsers(users);
}
