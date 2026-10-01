import puppeteer from 'puppeteer-core';

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const filePath = 'file:///' + 'C:/Users/UR Computers/Desktop/Dr_Farooq_Anwar_Chatha_CV.html'.replace(/\\/g, '/');
    
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Wait for Tailwind CDN script to render
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)));

    // Hide control bar and adjust styles for exact A4 PDF
    await page.evaluate(() => {
      const bar = document.querySelector('.no-print');
      if (bar) bar.style.display = 'none';
      document.body.style.background = '#ffffff';
      document.body.style.padding = '0';
      document.body.style.margin = '0';
    });

    const outputPath = 'C:/Users/UR Computers/Desktop/Dr_Farooq_Anwar_Chatha_CV.pdf';

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      preferCSSPageSize: true
    });

    console.log('PDF generated successfully at:', outputPath);
    await browser.close();
  } catch (err) {
    console.error('Error generating PDF:', err);
    process.exit(1);
  }
})();
