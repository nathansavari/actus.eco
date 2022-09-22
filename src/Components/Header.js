import React from 'react';
import '../pages/Newtab/Newtab.css';
import '../pages/Newtab/Newtab.scss';
import { useState } from 'react';

export default function Header() {
  const [search, setSearch] = useState('');
  return (
    <header className="header">
      <div className="left">
        <form
          className="form"
          action={`https://www.ecosia.org/search?q=${search}`}
          autoComplete="off"
        >
          <label>
            <input
              className="input"
              type="search"
              name="q"
              placeholder="Rechercher sur Ecosia"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
          </label>
          <input type="submit" value="" className="button"></input>
        </form>
      </div>

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
