const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  const htmlPath = `file:${path.resolve('index.html')}`;
  await page.goto(htmlPath);

  // Simulate form input
  await page.type('#username', '');
  await page.type('#password', '');
  await page.click('input[type="submit"]');

  await page.waitForTimeout(1000);
  await browser.close();
})();
