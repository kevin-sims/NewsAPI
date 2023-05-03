const express = require('express');
const axios = require('axios');
const cache = require('memory-cache');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const GNEWS_API_URL = 'https://gnews.io/api/v4/';

app.get('/articles', async (req, res) => {
  const { amount = 10, keyword, title, author } = req.query;

  const cacheKey = JSON.stringify(req.query);
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }

  try {
    const response = await axios.get(`${GNEWS_API_URL}search`, {
      params: {
        q: keyword || '',
        apikey: GNEWS_API_KEY,
        max: amount,
      },
    });

    const articles = response.data.articles.filter((article) => {
      if (title && !article.title.includes(title)) return false;
      if (author && !article.author.includes(author)) return false;
      return true;
    });

    cache.put(cacheKey, JSON.stringify(articles), 2 * 60 * 60 * 1000); // Cache for 2 hour

    res.json(articles);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching articles', msg: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
