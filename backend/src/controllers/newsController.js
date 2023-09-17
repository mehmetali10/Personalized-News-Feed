const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('929c930106b74a76b7ffa024fdce6a2d');
const apiKey = '32def6c2-ebd5-4f4a-90c4-cfa10e968439';

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
      pageSize: 40,
      from: from,
      to: to,
      sources: sources,
      author: author,
    };

    // Fetch data from the first API
    const newsApiResponse = await newsapi.v2.everything(params);

    // Fetch data from The Guardian API
    const guradianArticles = await getNewsFromTheGuardian(params);
    console.log(guradianArticles.length)
    // Combine data from both APIs
    const combinedData = [...newsApiResponse.articles, ...guradianArticles];

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

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
