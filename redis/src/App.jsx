import React, { useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import SearchUser from './SearchUser';

function App() {
  const [addedUser, setAddedUser] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);


  const addUser = (user) => {
    axios.post('http://localhost:3000/user', user)
      .then(response => {
        setAddedUser(response.data.user);
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };


  const searchUser = (id) => {
    axios.get(`http://localhost:3000/user/${id}`)
      .then(response => {
        setSearchedUser(response.data);
      })
      .catch(error => {
        console.error('User not found', error);
        setSearchedUser(null);
      });
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      <UserForm addUser={addUser} />


      {addedUser && (
        <div>
          <h3>User Added Successfully:</h3>

          <p>Name: {addedUser.name}</p>
          <p>Email: {addedUser.email}</p>
        </div>
      )}


      <SearchUser searchUser={searchUser} />


      {searchedUser ? (
        <div>
          <h3>User Found:</h3>

          <p>Name: {searchedUser.name}</p>
          <p>Email: {searchedUser.email}</p>
        </div>
      ) : (
        <p>No user found with the given ID.</p>
      )}
    </div>
  );
}

export default App;
