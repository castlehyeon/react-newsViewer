import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import NewsItems from "./NewsItems";
import axios from "axios";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  //상태변수로 관리
  //1. 서버에서 자료를 로딩한다 -> 비동기
  //2. 서버에 요청한 자료가 로딩중일때는 화면에 로딩중...
  //3. 서버에 요청한 자료가 로딩완료되면 출력

  // const [articles, setArticles] = useState(null);
  // const [loading, setLoading] = useState(false);

  const [loading, response, error] = usePromise(() => {
    const query = category === "all" ? "" : `&category=${category}`;
    console.log(
      "🚀 ~ file: NewsList.js:32 ~ const[loading,response,error]=usePromise ~ query:",
      query
    );
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=ae3df86896064a709c97f5898afccbc5`
    );
  }, [category]);
  // const fetchData = useCallback(async () => {
  //   const query = category === "all" ? "" : `&category=${category}`;
  //   const response = await axios.get(
  //     `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=ae3df86896064a709c97f5898afccbc5`
  //   );
  //   setArticles(response.data.articles);
  //   console.log("🚀 ~ file: NewsList.js:34 ~ fetchData ~ articles:", articles);

  //   //서버에 요청한 자료가 로딩 완료되면 완료 설정
  //   setLoading(false);
  // }, [category]);

  // useEffect(() => {
  //   try {
  //     setLoading(true);
  //     fetchData();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [category]);

  // const fetchData = useEffect(() => {
  //   try {
  //     setLoading(true);
  //   axios
  //     .get(
  //       "https://newsapi.org/v2/top-headlines?country=kr&apiKey=ae3df86896064a709c97f5898afccbc5"
  //     )
  //     .then(response => {
  //       setArticles(response.data.articles);
  //       //서버에 요청한 자료가 로딩 완료되면 완료 설정
  //       setLoading(false);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  if (loading) {
    return <NewsListBlock>서버에서 뉴스 로딩중 ...</NewsListBlock>;
  }

  console.log("🚀 ~ file: NewsList.js:79 ~ NewsList ~ response:", response);
  if (!response) {
    return null;
  }

  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }
  // if (!articles) {
  //   return <NewsListBlock>서버에 뉴스가 없습니다. ...</NewsListBlock>;
  // }

  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map(article => (
        // <NewsItems article={article} />
        <NewsItems key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
