import React from 'react';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return (
    <>
      <div className="OptionsContainer">
        <h1>{title}</h1>
        <p>Bientôt disponible !</p>
        <a href="https://nathansavari.notion.site/Instant-Plan-te-5619c1597fdb42519e92e7b29d590d19">
          En savoir plus
        </a>
      </div>
    </>
  );
};

export default Options;
