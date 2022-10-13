import React from 'react';
import { useEffect, useState } from 'react';
import './Newtab.css';
import './Newtab.scss';
import Spinner from '../../Components/Spinner';
import Header from '../../Components/Header';
import Card from '../../Components/Card';

import urls from './urls.js';

const Newtab = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { parse } = require('rss-to-json');

  // Reformatage du flux rss

  useEffect(() => {
    setIsLoading(true);

    async function getAllUrls() {
      try {
        const articles = [];

        // On récupère tous les articles de chaque url

        let promises = await Promise.allSettled(urls.map((url) => parse(url)));

        // On filtre les urls actives

        let data = promises.filter((promise) => promise.status === 'fulfilled');

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
            articleList.map((i) => <Card props={i} />)
          )}
        </div>
      </div>
    </>
  );
};

export default Newtab;
