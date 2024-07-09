import React from 'react';
import '../styles/learning.css'

function Learning({ username, designation, userImage }) {
    return (
      <div className="profile-container">
        <div className="profile-column">
          <img
            className="profile-image"
            src={userImage}
            alt={`${username}'s profile`}
          />
        </div>
        <div className="profile-column">
          <div className="profile-text">
            <h1 className="username">{username}</h1>
            <h2 className="designation">{designation}</h2>
          </div>
        </div>
      </div>
    );
  }

export default Learning;
