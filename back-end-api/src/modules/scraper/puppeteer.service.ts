import puppeteer from 'puppeteer';

export class PuppeteerService {
  async scrape(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('img, video', { timeout: 10000 });
    await page.content();

    const evaluateRes = await page.evaluate(() => {
      const imageUrls = [];
      const videoUrls = [];
      document
        .querySelectorAll('img')
        .forEach((img) => imageUrls.push(img.src));

      document.querySelectorAll('video').forEach((video) => {
        video
          .querySelectorAll('source')
          .forEach((source) => videoUrls.push(source.src));
        if (video.src) {
          videoUrls.push(video.src);
        }
      });

      return { imageUrls, videoUrls };
    });

    await browser.close();
    return evaluateRes;
  }
}
