const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('929c930106b74a76b7ffa024fdce6a2d');

exports.GetNews = async (req, res) => {
  try {
    const { q, sources, author } = req.query;
    let { from, to } = req.query;

    const defaultQuery = 'news';

    if (from) {
      from = new Date(from).toISOString();
    }
    if (to) {
      to = new Date(to).toISOString();
    }

    const params = {
      q: q || defaultQuery,
      pageSize: 80,
      from: from,
      to: to,
      sources: sources,
      author: author,
    };

    const response = await newsapi.v2.everything(params);

    if (response.status === 'ok') {
      const data = response.articles;
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
