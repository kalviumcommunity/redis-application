import React, { useState } from 'react';

function SearchUser({ searchUser }) {
  const [id, setId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    searchUser(id);
    setId('');
  };

  return (
    <div>
      <h2>Search for a User Name</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search User</button>
      </form>
    </div>
  );
}

export default SearchUser;
