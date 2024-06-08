import {retrieveSessionStorageUsers, updateSessionStorageWithUsers} from './renderUsers.js';
const userList = document.getElementById('user-list');
if (userList.innerHTML) {
  userList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-user')) {
      console.log(event.target.parentNode.parentNode);
      const userID =
        event.target.parentNode.parentNode.getAttribute('data-user-id');
      deleteUser(userID);
    }
  });
}

function deleteUser(userID) {
  fetch(`/api/delete-user/${userID}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then((data) => {
      console.log('delete api response', data);
      if (data.success) {
        removeUserFromUI(userID);
        updateSessionStorageAfterDelete(userID);
      }
    })
    .catch((error) => console.error(`error deleting user`, error));
}

function removeUserFromUI(userID) {
  // remove the user element from the dom
  // target the user's <li> using `userID`
  // use querySelector with attribute selector to find the <li>
  // which corresponds to `userID`
  const userItem = document.querySelector(`[data-user-id="${userID}"]`);
  // remove it from userList
  //// call .remove()
  if (userItem) {
    userItem.parentNode.removeChild(userItem);
  } else {
    console.log('user item does not exist');
  }
}

function updateSessionStorageAfterDelete(userID) {
  // retrieve the current list of users form S.S.
  // parse the JSON from session storage into an array
    const users = retrieveSessionStorageUsers();
  // filter out the user with the provided 'userID'
  // use Array.filter() to remove the user
  const filteredUsers = users.filter((user) => {
    return user.id !== userID; // keep the user if their id is not the deleted userID
  });
  // update session storage with the new list
  // stringify the array and save it back to storage
    updateSessionStorageAfterDelete(filteredUsers);
}
