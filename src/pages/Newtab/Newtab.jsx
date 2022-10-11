import React from 'react';
import { useEffect, useState } from 'react';
import './Newtab.css';
import './Newtab.scss';
import Photo from '../../assets/img/Photo.svg';
import Spinner from '../../Components/Spinner';
import Header from '../../Components/Header';
import {
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

import urls from './urls.js';

const Newtab = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { parse } = require('rss-to-json');

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

  useEffect(() => {
    setIsLoading(true);

    async function getAllUrls() {
      try {
        const articles = [];

        // On récupère tous les articles de chaque url

        let promises = await Promise.allSettled(urls.map((url) => parse(url)));

        // On filtre les urls actives

        let data = promises.filter((promise) => promise.status === 'fulfilled');

        console.log(data);

        // On prend chaque article de chaque source, et on les met dans le tableau "articles"

        for (let i = 0; i < data[data.length - 1].value.items.length; i++) {
          urls.forEach((url) => {
            articles.push(data[urls.indexOf(url)]?.value.items[i]);
          });
        }

        // On tri les articles pour qu'ils soient dans l'ordre de parution

        const sortedArticles = articles
          .slice()
          .sort((a, b) => new Date(b.published) - new Date(a.published))
          .slice(0, 24);

        setArticleList(sortedArticles);
      } catch (error) {
        console.log({ error });

        throw error;
      }
    }
    getAllUrls();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Header />

      <div className="App">
        <h2>Les dernières actualités</h2>
        <br />
        <div className="article-container">
          {isLoading === true ? (
            <Spinner />
          ) : (
            articleList.map((i) => (
              <a
                key={i.link}
                href={i.link}
                target="_blank"
                rel=" noopener noreferrer"
              >
                <article className="article-card">
                  <figure className="article-image">
                    {i.media.thumbnail ? (
                      <img src={i.media.thumbnail.url} alt={i.title} />
                    ) : i.enclosures.length > 0 ? (
                      <img src={i.enclosures[0]?.url} alt={i.title} />
                    ) : (
                      <img src={Photo} />
                    )}
                  </figure>
                  <div className="article-content">
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

                    <div className="card-social">
                      <EmailShareButton url={i.link} className="card-share">
                        <EmailIcon className="card-icon"></EmailIcon>
                      </EmailShareButton>
                      <LinkedinShareButton url={i.link}>
                        <LinkedinIcon className="card-icon"></LinkedinIcon>
                      </LinkedinShareButton>
                      <TwitterShareButton url={i.link}>
                        <TwitterIcon className="card-icon"></TwitterIcon>
                      </TwitterShareButton>
                    </div>
                  </div>
                </article>
              </a>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Newtab;
