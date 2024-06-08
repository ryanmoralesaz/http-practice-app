import { showUsers } from './utils/showUsers.js';
document
  .getElementById('addUserForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    let users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const name = this.name.value;
    const age = parseInt(this.age.value);
    const formData = { name: name, age: age };
    users.push(formData);
    sessionStorage.setItem('users', JSON.stringify(users));
    showUsers(users);
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
        showUsers(users);
        sessionStorage.setItem('users', JSON.stringify(users));
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        rollBackUserAdd(formData);
      });
  });

function rollBackUserAdd(formData) {
  let users = JSON.parse(sessionStorage.getItem('users') || '[]');
  users = users.filter((user) => user.name != formData.name);
  sessionStorage.setItem('users', JSON.stringify(users));
  showUsers(users);
}
