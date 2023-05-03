# News API Service

This API service is a wrapper around the GNews API (https://gnews.io/), which allows you to fetch news articles based on certain parameters. The service is built using Node.js and Express, with caching functionality provided by the `memory-cache` package.

## API Endpoints

There is only one main endpoint in this API:

### `GET /articles`

Fetch news articles based on the provided query parameters.

#### Query Parameters

- `amount` (optional, default: 10) - The number of articles to fetch.
- `keyword` (optional) - Search for articles containing the specified keyword.
- `title` (optional) - Search for articles with a title containing the specified string.
- `author` (optional) - Search for articles authored by the specified author.

#### Response

Returns a JSON array of articles, each represented as an object containing the following properties:

- `title`: The title of the article.
- `description`: A brief description of the article.
- `content`: The content of the article.
- `url`: The URL of the article.
- `image`: The URL of the article's main image.
- `publishedAt`: The date and time when the article was published, in ISO 8601 format.
- `source`: An object containing information about the source of the article, including `name` and `url`.

#### Example Request

``GET /articles?amount=5&keyword=technology&title=innovation&author=John``



Fetches up to 5 articles containing the keyword "technology", with a title containing the word "innovation", authored by someone named "John".

## Caching

The API service uses an in-memory cache to store the results of requests for 2 hour. This helps to reduce the number of requests made to the GNews API and improves the response time of the service.

To clear the cache, simply restart the server.

## Setup and Running the Server

1. install dependencies:

```
npm install
```


2. Create a `.env` file to store your GNews API key:

``GNEWS_API_KEY=your_gnews_api_key``

3. Run the server:

```
npm start
```


The server will start on port 3000 by default, or on the port specified in the `PORT` environment variable.
