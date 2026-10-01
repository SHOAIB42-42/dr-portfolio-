import puppeteer from 'puppeteer-core';
import path from 'path';

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
    
    const filePath = 'file:///' + 'C:/Users/UR Computers/Desktop/Dr_Farooq_Anwar_Chatha_CV.html'.replace(/\\/g, '/');
    console.log('Navigating to:', filePath);
    
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Wait for Tailwind CDN script to load and apply fonts/styles
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Hide the top control bar for a clean image
    await page.evaluate(() => {
      const bar = document.querySelector('.no-print');
      if (bar) bar.style.display = 'none';
      document.body.style.background = '#ffffff';
      document.body.style.padding = '0';
    });

    const cvElement = await page.$('.cv-container');
    const outputPath = 'C:/Users/UR Computers/Desktop/Dr_Farooq_Anwar_Chatha_CV.png';

    if (cvElement) {
      await cvElement.screenshot({ path: outputPath, type: 'png' });
    } else {
      await page.screenshot({ path: outputPath, fullPage: true, type: 'png' });
    }

    console.log('Screenshot saved successfully to:', outputPath);
    await browser.close();
  } catch (err) {
    console.error('Error taking screenshot:', err);
    process.exit(1);
  }
})();
