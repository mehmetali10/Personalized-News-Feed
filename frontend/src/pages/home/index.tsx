import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import NewsCard from '../../components/NewsCard';
import { getNews } from '../../service/api/news/news';
import { NewsModel } from '../../models/news/news';
import { Grid } from '@mui/material';

export default function IndexPage() {
  const [news, setNews] = useState<NewsModel[]>([]);

  useEffect(() => {
    getNews()
      .then((data) => setNews(data))
      .catch((error) => console.error('Haberleri alma hatası:', error));
  }, []);

  return (
    <>
      <Navbar />
      <Grid container padding={9} spacing={4}>
        {news.map((article) => (
          <Grid item xs={4} key={article.title}>
            <NewsCard article={article} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
