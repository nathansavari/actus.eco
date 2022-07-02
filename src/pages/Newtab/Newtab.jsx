import React from 'react';
import { useEffect, useState } from 'react';
import './Newtab.css';
import './Newtab.scss';
import '../../Components/Card';
import Photo from '../../assets/img/background.svg';

const Newtab = () => {
  const [articleList, setArticleList] = useState([]);

  const urls = [
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fyoumatter.world%2Ffr%2Fplanete%2Ffeed%2F',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.zerowastefrance.org%2Ffeed%3Fformat%3Drss',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fbonpote.com%2Ffeed%2F',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Freseauactionclimat.org%2Ffeed',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.halteobsolescence.org%2Ffeed%2F',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.ecologie.gouv.fr%2Frss_actualites.xml',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvert.eco%2Ffeed',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.novethic.fr%2Fflux-rss%2Fflux%2Frssall%2Ftous-les-articles.xml',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.feedburner.com%2Fademe-presse',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.francetvinfo.fr%2Fenvironnement.rss',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.natura-sciences.com%2Ffeed',
  ];

  useEffect(() => {
    async function getAllUrls(urls) {
      try {
        let data = await Promise.all(
          urls.map((url) => fetch(url).then((response) => response.json()))
        );

        const articles = [];

        for (let i = 0; i < data[0].items.length; i++) {
          articles.push(data[0].items[i]);
        }
        for (let i = 0; i < data[1].items.length; i++) {
          articles.push(data[1].items[i]);
        }
        for (let i = 0; i < data[2].items.length; i++) {
          articles.push(data[2].items[i]);
        }
        for (let i = 0; i < data[3].items.length; i++) {
          articles.push(data[3].items[i]);
        }
        for (let i = 0; i < data[4].items.length; i++) {
          articles.push(data[4].items[i]);
        }
        for (let i = 0; i < data[5].items.length; i++) {
          articles.push(data[5].items[i]);
        }
        for (let i = 0; i < data[6].items.length; i++) {
          articles.push(data[6].items[i]);
        }
        for (let i = 0; i < data[7].items.length; i++) {
          articles.push(data[7].items[i]);
        }
        for (let i = 0; i < data[8].items.length; i++) {
          articles.push(data[8].items[i]);
        }
        for (let i = 0; i < data[9].items.length; i++) {
          articles.push(data[9].items[i]);
        }
        for (let i = 0; i < data[10].items.length; i++) {
          articles.push(data[10].items[i]);
        }

        const sortedArticles = articles
          .slice()
          .sort(
            (a, b) =>
              new Date(Date.parse(b.pubDate)) - new Date(Date.parse(a.pubDate))
          )
          .slice(0, 21);

        console.log(sortedArticles);
        setArticleList(sortedArticles);
      } catch (error) {
        console.log(error);

        throw error;
      }
    }
    getAllUrls(urls);
  }, []);

  return (
    <>
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
      <div className="App">
        <h2>Les dernières actualités</h2>
        <br />
        <div className="article-container">
          {articleList.map((i) => (
            <a
              key={i.link}
              href={i.link}
              target="_blank"
              rel=" noopener noreferrer"
            >
              <article className="article-card">
                <figure className="article-image">
                  {i.thumbnail ? (
                    <img src={i.thumbnail} alt={i.title} />
                  ) : i.enclosure.link ? (
                    <img src={i.enclosure.link} alt={i.title} />
                  ) : (
                    <img src={Photo} />
                  )}
                </figure>
                <div className="article-content">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${i.link}&sz=128`}
                  ></img>

                  <h3 key={i.title} className="card-title">
                    {i.title}
                  </h3>
                  <p key={i.pubDate}>
                    {new Date(Date.parse(i.pubDate)).toLocaleDateString('fr')}
                  </p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Newtab;
