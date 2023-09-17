import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import NewsCard from '../../components/NewsCard';
import { getNews } from '../../service/api/news/news';
import { NewsModel } from '../../models/news/news';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Container,
  Box,
  Paper,
} from '@mui/material';

export default function IndexPage() {
  const [news, setNews] = useState<NewsModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]); 
  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>('');
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');

  const categoryOptions = [
    'bbc-news',
    'google-news',
    'business-insider',
    'engadget',
  ];

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await getNews({
        q: searchQuery,
        from: fromDate?.toISOString(),
        to: toDate?.toISOString(),
        sources: selectedSources.join(','),
        author: selectedAuthor,
      });
      console.log(selectedSources.join(','))
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
    setFromDate(null);
    setToDate(null);
    setSelectedSources([]);
    setSelectedAuthor('');
    setSearchQuery('');
    fetchNews();
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box mt={4} mb={4}>
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h4" align="center" gutterBottom>
                News Search
              </Typography>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Search News"
                      variant="outlined"
                      fullWidth
                      value={searchQuery || ''}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="From Date"
                      variant="outlined"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={fromDate?.toISOString().split('T')[0] || ''}
                      onChange={(e) => setFromDate(new Date(e.target.value))}
                      inputProps={{
                        max: new Date().toISOString().split('T')[0],
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="To Date"
                      variant="outlined"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={toDate?.toISOString().split('T')[0] || ''}
                      onChange={(e) => setToDate(new Date(e.target.value))}
                      inputProps={{
                        max: new Date().toISOString().split('T')[0],
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="sources-label">Sources</InputLabel>
                      <Select
                        labelId="sources-label"
                        label="Sources"
                        multiple 
                        value={selectedSources || []}
                        onChange={(e) =>
                          setSelectedSources(e.target.value as string[])
                        }
                        renderValue={(selected) =>
                          (selected as string[]).join(', ')
                        } 
                      >
                        {categoryOptions.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="Author"
                      variant="outlined"
                      fullWidth
                      value={selectedAuthor || ''}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Box mt={2} display="flex" gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                  <Button variant="contained" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box mt={4}>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Box>
        )}
        <Grid container spacing={3}>
          {news.map((article) => (
            <Grid item xs={12} sm={6} md={6} key={article.title}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
