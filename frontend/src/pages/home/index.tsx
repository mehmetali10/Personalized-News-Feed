import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import NewsCard from '../../components/NewsCard';
import { getNews } from '../../service/api/news/news';
import { NewsModel } from '../../models/news/news';
import { Grid, TextField, Button, Select, CircularProgress, Typography, MenuItem } from '@mui/material';

export default function IndexPage() {
  const [news, setNews] = useState<NewsModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedSources, setSelectedSources] = useState<string | undefined>(''); 
  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>('');
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');

  const categoryOptions = ['bbc-news', 'google-news', 'business-insider', 'engadget']; 

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await getNews({
        q: searchQuery,
        from: fromDate?.toISOString(), 
        to: toDate?.toISOString(), 
        sources: selectedSources,
        author: selectedAuthor,
      });
      setNews(data);
      setError('');
    } catch (error) {
      setNews([]);
      setError('Error fetching news data.');
      console.error('Haberleri alma hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = () => {
    fetchNews();
  };

  const clearFilters = () => {
    setFromDate(new Date()); 
    setToDate(new Date()); 
    setSelectedSources('');
    setSelectedAuthor('');
    setSearchQuery('');
    fetchNews();
  };

  return (
    <>
      <Navbar />
      <div>
        <TextField
          label="Search News"
          value={searchQuery || ''}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TextField
          label="From Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={fromDate?.toISOString().split('T')[0] || ''} 
          onChange={(e) => setFromDate(new Date(e.target.value))}
          inputProps={{ max: new Date().toISOString().split('T')[0] }} 
        />
        <TextField
          label="To Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={toDate?.toISOString().split('T')[0] || ''} 
          onChange={(e) => setToDate(new Date(e.target.value))}
          inputProps={{ max: new Date().toISOString().split('T')[0] }} 
        />
        <Select
          label="Sources"
          value={selectedSources || ''}
          onChange={(e) => setSelectedSources(e.target.value as string)}
        >
          <MenuItem value="">None</MenuItem>
          {categoryOptions.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Author"
          value={selectedAuthor || ''}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
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
