const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('929c930106b74a76b7ffa024fdce6a2d');

exports.GetNews = async (req, res) => {
  try {
    const response = await newsapi.v2.everything({
      q: 'news', // Use a generic query to retrieve a wide range of news articles
      pageSize: 10, // Limit the number of articles to 50
    });

    if (response.status === 'ok') {
      const data = response.articles;
      console.log('News Data:', data);
      res.status(200).json(data);
    } else {
      console.error('Failed to fetch news data:', response.message);
      res.status(500).json({ error: 'Failed to fetch news data' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
