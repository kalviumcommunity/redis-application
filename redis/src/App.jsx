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

      {/* Add User Form */}
      <UserForm addUser={addUser} />

      {/* Show added user */}
      {addedUser && (
        <div>
          <h3>User Added Successfully:</h3>
          {/* <p>ID: {addedUser.id}</p> */}
          <p>Name: {addedUser.name}</p>
          <p>Email: {addedUser.email}</p>
        </div>
      )}


      <SearchUser searchUser={searchUser} />

      {/* Show searched user */}
      {searchedUser ? (
        <div>
          <h3>User Found:</h3>
          {/* <p>ID: {searchedUser.id}</p> */}
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
