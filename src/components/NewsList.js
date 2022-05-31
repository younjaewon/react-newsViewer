import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import usePromise from '../lib/usePromise';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
box-sizing: border-box;
padding-bottom: 3rem;
width: 768px;
margin: 0 auto;
margin-top: 2rem;
@media screen and (max-width: 768px) {
  width:100px;
  padding-left: 1rem;
  padding-right: 1rem;
}
`;

const NewsList = ({ category }, props) => {
  console.log(`newList ${category}`);
  const [loading, response, error] = usePromise(() => {
    const query = category === undefined ? "" : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=9bcd8fcbb71a4ceab3cf37f260d7f8f1`
    );
  }, [category]);

  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }

  if (!response) {
    return null;
  }

  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }

  const { articles } = response.data;

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;