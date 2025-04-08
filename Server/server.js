// server/server.js
const express = require("express");
const cors = require("cors");
const scrapeCarOptions = require("./scrape");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/scrape", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const result = await scrapeCarOptions(url);
    res.json(result);
  } catch (err) {
    console.error("❌ Error scraping:", err);
    res.status(500).json({ error: "Scraping failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
