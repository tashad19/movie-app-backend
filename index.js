import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();

// Allow requests from your frontend's origin
const corsOptions = {
  origin: "https://movie-app-tashad.netlify.app", // Your Netlify app URL
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions)); // Enable CORS for specified origin

const API_KEY = process.env.TMDB_API_KEY;

app.get("/api/popular-movies", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get("/api/search-movies", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to search movies" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
