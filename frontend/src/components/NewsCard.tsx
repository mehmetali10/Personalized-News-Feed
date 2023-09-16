import React from 'react';
import { Card, CardContent, CardMedia, Typography, Link, Grid } from '@mui/material';
import { NewsModel } from '../models/news/news';

interface NewsCardProps {
  article: NewsModel;
}

const newsCardStyles: Record<string, React.CSSProperties> = {
  card: {
    padding: '4px',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
    backgroundColor: '#ffffff', // Beyaz arka plan
    borderRadius: '20px',
    minHeight: '350px',
    width: '40%', // Kartın genişliği
    margin: '0 auto', // Sayfanın ortasında hizalama
    marginTop: '35px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Gölgelendirme
  },
  content: {
    flex: '1 0 auto',
    padding: '16px',
  },
  media: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    marginBottom: '16px',
    borderTopLeftRadius: '20px', // Köşeleri yuvarlama
    borderTopRightRadius: '20px',
  },
};

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <Grid item xs={6}>
      <Card style={newsCardStyles.card}>
        <CardMedia
          style={newsCardStyles.media}
          image={article.urlToImage}
          title={article.title}
        />
        <CardContent style={newsCardStyles.content}>
          <Typography variant="h5" component="div" gutterBottom>
            {article.title}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {article.content?.substring(0, 250)}...{' '}
            <Link href={article.url} target="_blank" rel="noopener">
              Devamını Oku
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px' }}>
            Published by {article.source.name} on {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewsCard;
