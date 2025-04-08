// server/scrape.js
const puppeteer = require("puppeteer");

async function scrapeCarOptions(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  // Get general trip info
  const generalInfo = await page.evaluate(() => {
    const getText = (selector, index = 0) => {
      const elements = document.querySelectorAll(selector);
      return elements[index]?.innerText.trim() || null;
    };

    return {
      distance: getText(".font-medium", 5),
      travelTime: getText(".font-medium", 6),
      bestOption: getText(".font-medium", 7),
    };
  });

  // Car tabs scraping
  const tabButtons = await page.$$('[role="tab"]');
  const carDetails = {};

  for (let i = 0; i < tabButtons.length; i++) {
    await tabButtons[i].click();
    await new Promise((res) => setTimeout(res, 500)); // Small delay

    const carData = await page.evaluate(() => {
      const activePanel = document.querySelector('[role="tabpanel"]:not([hidden])');
      if (!activePanel) return null;

      const title = activePanel.querySelector("h3")?.textContent.trim() || "";
      const description = activePanel.querySelector("p")?.textContent.trim() || "";
      const price = activePanel.querySelector(".text-xl.font-bold")?.textContent.trim() || "";

      const features = Array.from(
        activePanel.querySelectorAll(".grid.grid-cols-2.gap-4 span.text-sm")
      ).map(span => span.textContent.trim());

      const image = activePanel.querySelector("img")?.src || "";

      return { title, description, price, features, image };
    });

    if (carData && carData.title) {
      carDetails[carData.title] = {
        description: carData.description,
        features: carData.features,
        fare: carData.price,
        image: carData.image
      };
    }
  }

  await browser.close();

  return {
    distance: generalInfo.distance,
    travelTime: generalInfo.travelTime,
    bestOption: generalInfo.bestOption,
    carOptions: Object.keys(carDetails),
    carDetails: carDetails
  };
}

module.exports = scrapeCarOptions;
