import { toggleEdit } from './editUser.js';
import { deleteUser } from './deleteUser.js';
function updateSessionStorageWithUsers(users) {
  sessionStorage.setItem('users', JSON.stringify(users));
}
function retrieveSessionStorageUsers() {
  return JSON.parse(sessionStorage.getItem('users')) || [];
}

function renderUsers(users) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  const userFragment = document.createDocumentFragment();
  const toggledUsers = JSON.parse(sessionStorage.getItem('toggledUsers')) || {};

  users.forEach((user, index) => {
    const userItem = document.createElement('li');
    userItem.setAttribute('data-user-id', user.id);

    const userHeader = document.createElement('h2');
    userHeader.textContent = `User ${index + 1}`;

    const userDeleteButton = document.createElement('span');
    userDeleteButton.classList.add('delete-user');
    userDeleteButton.textContent = 'x';
    userDeleteButton.addEventListener('click', () => deleteUser(user.id));

    const userEditButton = document.createElement('span');
    userEditButton.classList.add('edit-user');
    userEditButton.textContent = 'edit user';
    userEditButton.addEventListener('click', () => toggleEdit(user.id));

    userHeader.prepend(userDeleteButton);
    userHeader.append(userEditButton);
    userItem.append(userHeader);

    const userListInfo = document.createElement('ul');

    if (toggledUsers[user.id]) {
      // Directly create and append inputs if user is in edit mode
      createEditInputs(userItem, user, userListInfo);
    } else {
      appendUserDetails(userListInfo, user);
    }

    userItem.appendChild(userListInfo);
    userFragment.appendChild(userItem);
  });

  userList.appendChild(userFragment);
}

function appendUserDetails(userListInfo, user) {
  const nameItem = document.createElement('li');
  nameItem.textContent = `Name: `;
  const nameSpan = document.createElement('span');
  nameSpan.classList.add('username');
  nameSpan.textContent = user.name;
  nameItem.appendChild(nameSpan);
  userListInfo.appendChild(nameItem);

  const ageItem = document.createElement('li');
  ageItem.textContent = `Age: `;
  const ageSpan = document.createElement('span');
  ageSpan.classList.add('userage');
  ageSpan.textContent = user.age;
  ageItem.appendChild(ageSpan);
  userListInfo.appendChild(ageItem);
}

function createEditInputs(userItem, user, userListInfo) {
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = user.name;
  nameInput.classList.add('username-input');

  const ageInput = document.createElement('input');
  ageInput.type = 'number';
  ageInput.value = user.age;
  ageInput.classList.add('userage-input');

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name: ';
  nameLabel.appendChild(nameInput);

  const ageLabel = document.createElement('label');
  ageLabel.textContent = 'Age: ';
  ageLabel.appendChild(ageInput);

  userListInfo.appendChild(nameLabel); // Append the name label with input
  userListInfo.appendChild(ageLabel); // Append the age label with input
}
export {
  updateSessionStorageWithUsers,
  retrieveSessionStorageUsers,
  renderUsers
};
