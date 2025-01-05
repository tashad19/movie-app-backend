const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

const API_KEY = process.env.TMDB_API_KEY;

app.get("/api/popular-movies", async (req, res) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  const data = await response.json();
  res.json(data.results);
});

app.get("/api/search-movies", async (req, res) => {
  const { query } = req.query;
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  res.json(data.results);
});
