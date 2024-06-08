import { toggleEdit } from './editUser.js';
function updateSessionStorageWithUsers(users) {
  sessionStorage.setItem('users', JSON.stringify(users));
}
function retrieveSessionStorageUsers() {
  return JSON.parse(sessionStorage.getItem('users')) || [];
}
function renderUsers(users) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  const userFragment = document.createDocumentFragment(); // create a fragment to hold all the ui updates
  if (userList) {
    users.forEach((user, index) => {
      const userItem = document.createElement('li');
      userItem.setAttribute('data-user-id', user.id);
      const userHeader = document.createElement('h2');
      const userDeleteButton = document.createElement('span');
      userDeleteButton.classList.add('delete-user');
      userDeleteButton.textContent = 'x';
      const userEditButton = document.createElement('span');
      userEditButton.classList.add('edit-user');
      userEditButton.textContent = 'edit user';
      userEditButton.addEventListener('click', function (event) {
        toggleEdit(user.id);
      });
      userHeader.textContent = `User ${index + 1}`;
      userHeader.prepend(userDeleteButton);
      userHeader.appendChild(userEditButton);
      userItem.appendChild(userHeader);
      const userListInfo = document.createElement('ul');
      const nameItem = document.createElement('li');
      const nameIndicator = document.createTextNode('Name: ');
      nameItem.appendChild(nameIndicator);
      const nameSpan = document.createElement('span');
      nameSpan.classList.add('username');
      nameSpan.textContent = `${user.name}`;
      nameItem.appendChild(nameSpan);
      const ageItem = document.createElement('li');
      const ageIndicator = document.createTextNode('Age: ');
      ageItem.appendChild(ageIndicator);
      const ageSpan = document.createElement('span');
      ageSpan.classList.add('userage');
      ageSpan.textContent = `user age: ${user.age}`;
      ageItem.appendChild(ageSpan);
      userListInfo.appendChild(nameItem);
      userListInfo.appendChild(ageItem);
      userItem.appendChild(userListInfo);
      userFragment.appendChild(userItem);
    });
    userList.appendChild(userFragment);
  }
}

export {
  updateSessionStorageWithUsers,
  retrieveSessionStorageUsers,
  renderUsers
};
