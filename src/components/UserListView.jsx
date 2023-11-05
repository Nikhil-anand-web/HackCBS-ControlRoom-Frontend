import React, { useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([
    { name: 'User 1' },
    { name: 'User 2' },
    { name: 'User 3' },
  ]);

  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name}
            <button onClick={() => handleDeleteUser(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
