import React from 'react';
import { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';
import '../../Components/Card';

const Newtab = () => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const findArticles = async () => {
      const data = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.zerowastefrance.org%2Ffeed%3Fformat%3Drss'
      );
      const body = await data.json();
      console.log(body.items);
      setArticleList(body.items);
    };

    findArticles();
  }, []);

  return (
    <div className="App">
      <div className="article-container">
        {articleList.map((article) => (
          <a href={article.link} target="_blank" rel=" noopener noreferrer">
            <article className="article-card">
              <figure className="article-image">
                <img src={article.thumbnail} />
              </figure>
              <div className="article-content">
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
