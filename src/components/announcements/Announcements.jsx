import React from 'react';

const Announcements = ({ text }) => {
  return (
    <div className="announcements-container">
      <h2>Announcements</h2>
      <p>{text}</p>
    </div>
  );
};

export default Announcements;
