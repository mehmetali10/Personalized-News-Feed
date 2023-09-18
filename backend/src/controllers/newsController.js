const NewsAPI = require('newsapi');
const newsApiKey = process.env.NEWSAPIKEY
const newsapi = new NewsAPI(newsApiKey);
const apiKey = process.env.THE_GUARDIAN_API_KEY;

exports.GetNews = async (req, res) => {
  try {
    const { q, sources, author } = req.query;
    let { from, to } = req.query;

    if (from) {
      from = new Date(from).toISOString();
    }
    if (to) {
      to = new Date(to).toISOString();
    }

    const params = {
      q: q || 'news',
      pageSize: 40,
      from: from,
      to: to,
      sources: sources,
      author: author,
    };

    const newsApiArticles = await getNewsFromNewsApi(params);
    const guradianArticles = await getNewsFromTheGuardian(params);

    // Combine data from both APIs
    const combinedData = [...newsApiArticles, ...guradianArticles];

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

async function getNewsFromNewsApi(params) {
  try {

    const newsApiResponse = await newsapi.v2.everything(params);
    return newsApiResponse.articles
    
  } catch (error) {
    console.error("NewsAPI request error:", error);
    return [];
  }
}

// Function to fetch news from The Guardian API
async function getNewsFromTheGuardian(params) {
  try {

    // Format the fromDate parameter
    const fromDateParam = params.from ? `&from-date=${new Date(params.from).toISOString()}` : '';

    if (params.sources != '' || params.author != '') {
      return []
    }
    const apiUrl = `https://content.guardianapis.com/search?q=${params.q}${fromDateParam}&api-key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.response && data.response.status === 'ok') {
      // Map results to NewsModel
      const results = data.response.results.map((item) => ({
        source: {
          id: item.id,
          name: item.pillarName,
        },
        title: item.webTitle,
        url: item.webUrl,
        publishedAt: new Date(item.webPublicationDate),
      }));

      return results;
    } else {
      console.error("The Guardian API error:", data.response.message);
      return [];
    }
  } catch (error) {
    console.error("The Guardian API request error:", error);
    return [];
  }
}
