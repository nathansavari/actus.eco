import React from 'react';
import { useEffect, useState } from 'react';
import './Newtab.css';
import './Newtab.scss';
import Photo from '../../assets/img/background.svg';
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

const Newtab = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { parse } = require('rss-to-json');

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
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Flareleveetlapeste.fr%2Ffeed%2F',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.francetvinfo.fr%2Fenvironnement.rss',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.natura-sciences.com%2Ffeed',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fpositivr.fr%2Ffeed%2F',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fpiochemag.fr%2Ffeed%2F',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Fenerzine-lesdernieresbreves',
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.greenunivers.com%2Ffeed%2F',
  ];

  const urls2 = [
    'http://positivr.fr/feed/',
    'http://lareleveetlapeste.fr/feed/',
    'http://www.novethic.fr/flux-rss/flux/rssall/tous-les-articles.xml',
    'https://vert.eco/feed',
    'http://www.francetvinfo.fr/environnement.rss',
    'https://bonpote.com/feed/',
    'http://www.developpement-durable.gouv.fr/rss_actualites.html',
    'http://rss.futura-sciences.com/fs/environnement/actus',
  ];

  useEffect(() => {
    setIsLoading(true);
    const regex = '&#8217;';

    async function getAllUrls() {
      try {
        // On récupère tous les articles de chaque url

        // let data = await Promise.all(
        //   urls.map((url) => fetch(url).then((response) => response.json()))
        // );

        // console.log(data);

        const articles = [];

        let data2 = await Promise.all(urls2.map((url) => parse(url)));

        console.log(data2);

        // console.log(data2[0].items);

        // (async () => {
        //   var rss = await parse('https://blog.ethereum.org/feed.xml');

        //   console.log(JSON.stringify(rss, null, 3));
        // })();

        // On prend chaque article de chaque source, et on les met dans le tableau "articles"

        for (let i = 0; i < data2[data2.length - 1].items.length; i++) {
          urls2.forEach((url) => {
            articles.push(data2[urls2.indexOf(url)].items[i]);
          });
        }

        // On tri les articles pour qu'ils soient dans l'ordre de parution

        const sortedArticles = articles
          .slice()
          .sort((a, b) => new Date(b.published) - new Date(a.published))
          .slice(0, 21);

        setArticleList(sortedArticles);
      } catch (error) {
        console.log(error);

        throw error;
      }
    }
    getAllUrls(urls);
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
                    ) : i.link ? (
                      <img src={i.link} />
                    ) : (
                      <img src={Photo} />
                    )}
                  </figure>
                  <div className="article-content">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${i.link}&sz=128`}
                    ></img>

                    <p key={i.published} className="card-date">
                      {console.log(new Date(i.published))}
                      {new Date(i.published).toLocaleDateString('fr')}
                    </p>
                    {i.title.length <= 85 ? (
                      <h3 key={i.title} className="card-title">
                        {i.title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
                      </h3>
                    ) : (
                      <h3 key={i.title} className="card-title">
                        {i.title.substring(0, 85) + '...'}
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
