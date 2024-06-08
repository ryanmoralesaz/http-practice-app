function showUsers(users) {
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
      userHeader.textContent = `User ${index + 1}`;
      userHeader.prepend(userDeleteButton);
      userItem.appendChild(userHeader);
      const userListInfo = document.createElement('ul');
      const nameItem = document.createElement('li');
      const nameSpan = document.createElement('span');
      nameSpan.classList.add = 'username';
      nameSpan.textContent = `${user.name}`;
      nameItem.appendChild(nameSpan);
      const ageItem = document.createElement('li');
      const ageSpan = document.createElement('span');
      ageSpan.classList.add = 'userage';
      ageSpan.textContent = `${user.age}`;
      ageItem.appendChild(ageSpan);
      userListInfo.appendChild(nameItem);
      userListInfo.appendChild(ageItem);
      userItem.appendChild(userListInfo);
      userFragment.appendChild(userItem);
    });
    userList.appendChild(userFragment);
  }
}

export { showUsers };
