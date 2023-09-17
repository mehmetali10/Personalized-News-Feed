import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import NewsCard from '../../components/NewsCard';
import { getNews } from '../../service/api/news/news';
import { NewsModel } from '../../models/news/news';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Container,
  Box,
  Paper,
  IconButton,
  Button,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface NewsSearchProps {
  toggleForm: () => void;
  formExpanded: boolean;
}

interface SearchFormProps {
  searchQuery: string | undefined;
  setSearchQuery: (value: string | undefined) => void;
  fromDate: Date | null;
  setFromDate: (date: Date | null) => void;
  toDate: Date | null;
  setToDate: (date: Date | null) => void;
  selectedSources: string[];
  setSelectedSources: (sources: string[]) => void;
  selectedAuthor: string | undefined;
  setSelectedAuthor: (author: string | undefined) => void;
  handleSearch: () => void;
  clearFilters: () => void;
  categoryOptions: string[];
}

interface LoadingSectionProps {
  loading: boolean;
}

interface ErrorSectionProps {
  error: string | undefined;
}

interface NewsSectionProps {
  news: NewsModel[];
}

export default function IndexPage() {
  const [news, setNews] = useState<NewsModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>('');
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [formExpanded, setFormExpanded] = useState<boolean>(true);

  const categoryOptions: string[] = [
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

  const toggleForm = () => {
    setFormExpanded(!formExpanded);
  };
  const divStyle = {
    backgroundColor: '#F9F9F9', // Arka plan rengi
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/batthern.png")', // Arka plan görüntüsü
    /* Diğer CSS özellikleri buraya ekleyebilirsiniz. */
  };

  return (
    <>
    <div style={divStyle}>
      <Navbar />
        <Container maxWidth="md">
          <Box mt={4} mb={4}>
            <Paper elevation={3}>
              <Box p={3}>
                <Header toggleForm={toggleForm} formExpanded={formExpanded} />
                {formExpanded && <SearchForm
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  fromDate={fromDate}
                  setFromDate={setFromDate}
                  toDate={toDate}
                  setToDate={setToDate}
                  selectedSources={selectedSources}
                  setSelectedSources={setSelectedSources}
                  selectedAuthor={selectedAuthor}
                  setSelectedAuthor={setSelectedAuthor}
                  handleSearch={handleSearch}
                  clearFilters={clearFilters}
                  categoryOptions={categoryOptions}
                />}
              </Box>
            </Paper>
          </Box>
          <LoadingSection loading={loading} />
          <ErrorSection error={error} />
          <NewsSection news={news} />
        </Container>
      </div>

    </>
  );
}

function Header({ toggleForm, formExpanded }: NewsSearchProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
      <Typography variant="h4" gutterBottom>
        News Search
      </Typography>
      <IconButton onClick={toggleForm} color="primary">
        {formExpanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </div>
  );
}

function SearchForm(props: SearchFormProps) {
  const {
    searchQuery,
    setSearchQuery,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    selectedSources,
    setSelectedSources,
    selectedAuthor,
    setSelectedAuthor,
    handleSearch,
    clearFilters,
    categoryOptions,
  } = props;

  return (
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
  );
}

function LoadingSection({ loading }: LoadingSectionProps) {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      {loading && <CircularProgress />}
    </Box>
  );
}

function ErrorSection({ error }: ErrorSectionProps) {
  return (
    error && (
      <Box mt={4}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Box>
    )
  );
}

function NewsSection({ news }: NewsSectionProps) {
  return (
    <Grid container spacing={3}>
      {news.map((article) => (
        <Grid item xs={12} sm={6} md={6} key={article.title}>
          <NewsCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
}
