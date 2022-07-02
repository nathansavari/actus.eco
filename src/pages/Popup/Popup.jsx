import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Toutes les news sur l’environnement, à un seul endroit.</p>
        <a
          className="App-link"
          href="https://nathansavari.notion.site/Instant-Plan-te-5619c1597fdb42519e92e7b29d590d19"
          target="_blank"
          rel="noopener noreferrer"
        >
          En savoir plus
        </a>
      </header>
    </div>
  );
};

export default Popup;
