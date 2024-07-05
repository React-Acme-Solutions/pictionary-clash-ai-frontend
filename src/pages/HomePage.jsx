import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.scss'; // Import the SCSS file for styles

const HomePage = () => {
 return (
   <div className="homePage">
     <h1>Welcome to Picture Clash</h1>
     <Link to="/game" className="startGameLink">Start Game</Link>
   </div>
 );
};

export default HomePage;
