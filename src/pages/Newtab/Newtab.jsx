import React from 'react';
import { useEffect, useState } from 'react';
import './Newtab.css';
import './Newtab.scss';
import '../../Components/Card';

const Newtab = () => {
  const [articleList, setArticleList] = useState([]);

  const urls = [
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fyoumatter.world%2Ffr%2Fplanete%2Ffeed%2F',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.zerowastefrance.org%2Ffeed%3Fformat%3Drss',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fbonpote.com%2Ffeed%2F',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftheconversation.com%2Ffr%2Fenvironnement%2Farticles.atom',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Freseauactionclimat.org%2Ffeed',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvert.eco%2Ffeed',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.halteobsolescence.org%2Ffeed%2F',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.ecologie.gouv.fr%2Frss_actualites.xml',
  ];

  useEffect(() => {
    async function getAllUrls(urls) {
      try {
        var data = await Promise.all(
          urls.map((url) => fetch(url).then((response) => response.json()))
        );

        var articles = [];

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

        const sortedArticles = articles
          .slice()
          .sort(
            (a, b) =>
              new Date(Date.parse(b.pubDate)) - new Date(Date.parse(a.pubDate))
          );

        console.log(sortedArticles);
        setArticleList(sortedArticles);
      } catch (error) {
        console.log(error);

        throw error;
      }
    }
    getAllUrls(urls);

    // const findArticles = async () => {
    //   const data = await fetch(urls[0]);
    //   const body = await data.json();
    //   // console.log(body);
    //   setArticleList(body.items);
    // };

    // findArticles();
  }, []);

  return (
    <div className="App">
      <div className="article-container">
        {articleList.map((article) => (
          <a
            key={article.link}
            href={article.link}
            target="_blank"
            rel=" noopener noreferrer"
          >
            <article className="article-card">
              {/* {console.log(articleList)} */}
              <figure className="article-image">
                <img src={article.thumbnail} />
              </figure>
              <div className="article-content">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${article.link}&sz=128`}
                ></img>

                <h3 key={article.title} className="card-title">
                  {article.title}
                </h3>
                <p key={article.pubDate}>
                  {new Date(Date.parse(article.pubDate)).toLocaleDateString(
                    'fr'
                  )}
                </p>
              </div>
            </article>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Newtab;
