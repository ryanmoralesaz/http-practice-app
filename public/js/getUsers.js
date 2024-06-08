import { updateSessionStorageWithUsers, renderUsers } from './renderUsers.js';
window.onload = function () {
  fetch('http://127.0.0.1:3000/api/users')
    // put content headers in fetch call
    .then((response) => response.json()) //why does response get sent to json?
    .then((users) => {
      console.log(users);
      updateSessionStorageWithUsers(users);
      renderUsers(users);
    })
    .catch((error) => console.error('Error fetching data:', error));
};
