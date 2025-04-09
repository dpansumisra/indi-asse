// server/server.js
const express = require("express");
const cors = require("cors");
const scrapeCarOptions = require("./scrape");
const puppeteer = require('puppeteer');

const app = express();
const PORT = 5000;
app.use(express.json());

app.use(cors());

app.get("/api/scrape", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const result = await scrapeCarOptions(url);
    res.json(result);
  } catch (err) {
    console.error(" Error scraping:", err);
    res.status(500).json({ error: "Scraping failed" });
  }
});


// ----------------------------------------------------------------------------

app.get('/scrape-links', async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://indirides.com/', {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForSelector('a.hover\\:text-primary.transition-colors');

  const links = await page.$$eval('a.hover\\:text-primary.transition-colors', (elements) =>
    elements.map(el => el.href)
  );

  await browser.close();
  res.json(links);
});

// ----------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
