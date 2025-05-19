const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Forward browser console logs to terminal
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // Load local index.html using file:// protocol
    const htmlPath = `file:${path.resolve('index.html')}`;
    await page.goto(htmlPath);

    // Simulate form input (currently inputs are empty)
    await page.type('#username', ''); // Fill with test value if needed
    await page.type('#password', ''); // Fill with test value if needed
    await page.click('input[type="submit"]');

    // Wait for any client-side result rendering
    await page.waitForTimeout(1000);

    await browser.close();
  } catch (error) {
    console.error('Login validation failed:', error);
    process.exit(1); // Fail CI build if any error occurs
  }
})();
