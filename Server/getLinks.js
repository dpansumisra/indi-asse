const puppeteer = require("puppeteer");

async function getAllLinks() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://indirides.com/", { waitUntil: "domcontentloaded" });

  await page.waitForSelector('a.hover\\:text-primary.transition-colors');

  const links = await page.$$eval('a.hover\\:text-primary.transition-colors', (elements) =>
    elements.map((el) => el.href)
  );

  await browser.close();
  return links;
}

module.exports = getAllLinks;
