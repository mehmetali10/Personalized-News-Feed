import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import NewsCard from '../../components/NewsCard'; // NewsCard bileşenini içe aktarın
import { getNews } from '../../service/api/news/news';
import { NewsModel } from '../../models/news/news';

export default function IndexPage() {
  const [news, setNews] = useState<NewsModel[]>([]); // Haberleri saklamak için bir state kullanın

  useEffect(() => {
    getNews()
      .then((data) => setNews(data))
      .catch((error) => console.error('Haberleri alma hatası:', error));
  }, []);

  return (
    <>
      <Navbar />
      {news.map((article) => (
        <NewsCard key={article.title} article={article} />
      ))}
    </>
  );
}
