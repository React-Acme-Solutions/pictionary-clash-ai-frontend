// src/components/Header.jsx

import React from 'react';


const Header = () => {
    return (
        <header className="header">
          
            <nav className="nav-menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
