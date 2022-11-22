import React from 'react';
import Photo from '../assets/img/Photo';
import Share from './Share';

export default function Card({ props }) {
  // Reformatage du flux rss

  const mapObj = {
    '&#8220;': '"',
    '&#8217;': "'",
    '&#8221;': '"',
    '&#8230;': '...',
    '&#8211;': '-',
    '&#160;': ' ',
    '&#038;': '&',
    '&#xEA;': 'ê',
    '&#xE9;': 'é',
    '&#xE8;': 'è',
  };

  const reg = new RegExp(Object.keys(mapObj).join('|'), 'gi');

  const i = props;

  console.log(i);

  return (
    <article className="article-card">
      <figure className="article-image">
        {i.media.thumbnail ? (
          <img src={i.media?.thumbnail?.url} alt={i.title} />
        ) : i.enclosures.length > 0 ? (
          <img src={i.enclosures[0]?.url} alt={i.title} />
        ) : (
          <img src={Photo} />
        )}
      </figure>

      <div className="article-content">
        <a href={i.link} target="_blank" rel=" noopener noreferrer">
          <img
            src={`https://www.google.com/s2/favicons?domain=${i.link}&sz=128`}
          ></img>

          <p key={i.published} className="card-date">
            {new Date(i.published).toLocaleDateString('fr')}
          </p>
          {i.title.length <= 85 ? (
            <h3 key={i.title} className="card-title">
              {i.title.replace(reg, function (matched) {
                return mapObj[matched];
              })}
            </h3>
          ) : (
            <h3 key={i.title} className="card-title">
              {i.title
                .replace(reg, function (matched) {
                  return mapObj[matched];
                })

                .substring(0, 85) + '...'}
            </h3>
          )}
        </a>
        <Share props={i} />
      </div>
    </article>
  );
}
