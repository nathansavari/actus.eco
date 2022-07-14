import React from 'react';
import '../pages/Newtab/Newtab.css';
import '../pages/Newtab/Newtab.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="logo"></div>

      <nav className="nav">
        <a href="https://www.gmail.com">
          <p>Gmail</p>
        </a>
        <a href="https://www.google.fr/imghp?hl=fr&tab=ri&authuser=0&ogbl">
          <p>Images</p>
        </a>
      </nav>
    </header>
  );
}
