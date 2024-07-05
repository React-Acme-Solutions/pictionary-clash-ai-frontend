import React from 'react';

const Announcements = (text) => {
  console.log('text:', text);
  return (
    <div className="announcements-container">
      <h2>Announcements</h2>
      <p>{text.text}</p>
    </div>
  );
};

export default Announcements;
