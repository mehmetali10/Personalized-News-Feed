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
    borderRadius: '20px',
    minHeight: '350px',
    width: '95%',
    margin: '0 auto',
    marginTop: '55px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    border: '1px solid #000', // Sınırı daha belirgin yapmak için buradaki değeri ekleyin
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
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
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
            {article.content?.substring(0, 250)}...
            <Link href={article.url} target="_blank" rel="noopener" style={{ marginLeft: '4px', fontWeight: 'bold' }}>
              Devamını Oku
            </Link>
          </Typography>
          <div style={{ marginTop: '16px' }}>
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
