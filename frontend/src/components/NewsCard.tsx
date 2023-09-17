import React from 'react';
import { Card, CardContent, CardMedia, Typography, Link } from '@mui/material';
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
    backgroundColor: '#ffffff',
    borderRadius: '10px', 
    minHeight: '320px', 
    width: '95%',
    margin: '0 auto',
    marginTop: '30px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    border: '1px solid gray', 
  },
  media: {
    width: '100%',
    height: '200px', 
    objectFit: 'cover',
    borderTopLeftRadius: '10px', 
    borderTopRightRadius: '10px',
  },
  content: {
    flex: '1 0 auto',
    padding: '16px',
  },
};

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <Card style={newsCardStyles.card}>
      {article.urlToImage && (
        <CardMedia
          style={newsCardStyles.media}
          image={article.urlToImage}
          title={article.title}
        />
      )}
      <CardContent style={newsCardStyles.content}>
        <Typography variant="h5" component="div" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {article.content?.substring(0, 200)}...
          <Link href={article.url} target="_blank" rel="noopener" style={{ marginLeft: '4px', fontWeight: 'bold' }}>
            Devamını Oku
          </Link>
        </Typography>
        <div style={{ marginTop: '8px' }}>
          <Typography variant="body2" color="textSecondary">
            Published by {article.source.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Published on {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
