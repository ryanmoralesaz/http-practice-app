let toggledUsers = JSON.parse(sessionStorage.getItem('toggledUsers')) || {};

function toggleEdit(userID) {
  if (toggledUsers[userID]) {
    return;
  } else {
    toggledUsers[userID] = true;
    sessionStorage.setItem('toggledUsers', JSON.stringify(toggledUsers));
  }
  // cache the user List item
  const userItem = document.querySelector(`[data-user-id="${userID}"`);
  // cache the usernamespan by className query
  const userNameSpan = document.querySelector('.username');
  // cache the useragespan by className query
  const userAgeSpan = document.querySelector('.userage');

  // create a name input element
  const userNameInput = document.createElement('input');
  userNameInput.type = 'text';
  // make it type text
  // set the current value to the name span text content
  userNameInput.value = userNameSpan.textContent;
  // capture the parent and replace itself with the name input
  userNameSpan.parentNode.replaceChild(userNameInput, userNameSpan);

  // create a user age input
  const userAgeInput = document.createElement('input');
  // make the input type number
  userAgeInput.type = 'number';
  // make the value the current agespan  text content
  userAgeInput.value = userAgeSpan.textContent;
  // replace the name span by capturing the parent node
  userAgeSpan.parentNode.replaceChild(userAgeInput, userAgeSpan);

  // create a submit button
  const userEditButton = document.createElement('button');
  userEditButton.type = 'submit';
  // make the text content 'submit'
  userEditButton.textContent = 'EDIT';
  // add an onclick handler for the submit edit with usreID, nameinput vaule and user age input value as arguments
  userEditButton.addEventListener('click', function (event) {
    submitEdit(userID, userNameInput.value, userAgeInput.value);
  });

  const cancelUserEditButton = document.createElement('button');
  cancelUserEditButton.type = 'button';
  cancelUserEditButton.textContent = 'Cancel Edit';
  // need to add a cancel edit function
  userItem.appendChild(userEditButton);
  userItem.appendChild(cancelUserEditButton);

  // append the submit button to the user item
}

function submitEdit(userID, name, age) {
  // fetch the update-user endpoint
  // use the patch method
  // state the application/json header
  // submit the stringified name and age as the body of the fetch
  // get the returned response
  // if successful
  // call the UI update function
  // catch any errors
}

function updateUIafterEdit(userID, name, age) {}

export { toggleEdit };
