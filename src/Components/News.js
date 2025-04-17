import React, { useState, useEffect, useCallback } from 'react';
import NewsItem from './NewsItem';
import 'react-loading-skeleton/dist/skeleton.css';
import NewsSkeleton from './NewsSkeleton';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country = 'us', pageSize = 6, category = 'general', setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const fetchNews = useCallback(async () => {
    setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=bb5a8cfd44fb42d889752bf6b9455670&page=1&pageSize=${pageSize}`;
    try {
      const data = await fetch(url);
      setProgress(30);
      const parsedData = await data.json();
      setProgress(70);
      setArticles(Array.isArray(parsedData.articles) ? parsedData.articles : []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setProgress(100);
    }
  }, [country, category, pageSize, setProgress]);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
    fetchNews();
  }, [fetchNews, category]);

  let throttleTimeout = null;

const fetchMoreData = () => {
  if (throttleTimeout) return;

  throttleTimeout = setTimeout(async () => {
    const nextPage = page + 1;
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=bb5a8cfd44fb42d889752bf6b9455670&page=${nextPage}&pageSize=${pageSize}`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      setArticles((prevArticles) =>
        prevArticles.concat(Array.isArray(parsedData.articles) ? parsedData.articles : [])
      );
      setTotalResults(parsedData.totalResults || totalResults);
      setPage(nextPage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching more news:", error);
      setLoading(false);
    }

    throttleTimeout = null; 
  }, 1000); 
};


  return (
    <>
      <h2 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h2>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={(element.title || '').slice(0, 45)}
                  description={(element.description || '').slice(0, 88)}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source}
                />
              </div>
            ))}
            {loading &&
              Array.from({ length: 3 }).map((_, index) => (
                <NewsSkeleton key={`skeleton-${index}`} />
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;
