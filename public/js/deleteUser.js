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

}

function updateSessionStorageAfterDelete(userID) { 
    
}