import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from 'react-bootstrap/Table';
import { faHome, faChartBar, faCog, faSearch, faBell, faUser, faSignOutAlt, faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Business Owner' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'user' },
    { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com', role: 'user' },
    { id: 4, name: 'John Doe', email: 'johndoe@example.com', role: 'Business Owner' },
    { id: 5, name: 'Jane Smith', email: 'janesmith@example.com', role: 'user' },
    { id: 6, name: 'John Doe', email: 'johndoe@example.com', role: 'Business Owner' },
    { id: 7, name: 'Jane Smith', email: 'janesmith@example.com', role: 'user' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const handleUpdateUserRole = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="user-management">
        <div className="top-bar">
          <input type="text" placeholder="Search" onChange={handleSearch} />
          <FontAwesomeIcon icon={faSearch} className="icon" />
          <div className="top-bar2">
            <FontAwesomeIcon icon={faBell} className="icon" />
            <FontAwesomeIcon icon={faUser} className="icon" />
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          </div>
        </div>
      </div>
      <div className="user-management">
        <div className="side-menu">
          <h2>Menu</h2>
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} className="menu-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/UserManagement">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> User
              </Link>
            </li>
            <li>
              <Link to="/BusinessListing">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> Business Listings
              </Link>
            </li>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> Report
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <FontAwesomeIcon icon={faCog} className="menu-icon" /> Settings
              </Link>
            </li>
          </ul>
        </div>
<div ><h2>List Of Users</h2></div>
        <Table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn make-admin"
                      onClick={() => handleUpdateUserRole(user.id, 'admin')}
                    >
                      <FontAwesomeIcon icon={faEdit} className="icon" /> 
                    </button>
                   
                    <button
                    className="btn delete-user"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="icon" /> 
                  </button>
                  <Link className="btn view-profile" to={`/user/${user.id}`}>
                    <FontAwesomeIcon icon={faEye} className="icon" /> 
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
);

};

export default UserManagement;